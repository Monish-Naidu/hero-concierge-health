// src/api/apollo-client.ts
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    ApolloLink,
    type Operation,
    type NextLink,
    type FetchResult,
    type FetchPolicy,
    type NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const isServer = typeof window === "undefined";
const ENABLE_CACHE = process.env.NEXT_PUBLIC_ENABLE_APOLLO_CACHE === "true";
const GRAPHQL_URI_ENV = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

function parseAllowedSites(): string[] {
    const raw = process.env.NEXT_PUBLIC_SITE_URL || "";
    return raw
        .split(/[,\s]+/)
        .map((s) => s.trim().replace(/\/+$/, ""))
        .filter(Boolean);
}

function normalizeOrigin(input: string): string {
    const v = input.trim().replace(/\/+$/, "");
    return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function detectServerOrigin(headers?: HeadersInit): string | undefined {
    if (!headers) return undefined;
    const h = new Headers(headers as any);
    const host = h.get("x-forwarded-host") || h.get("host");
    if (!host) return undefined;
    const proto = h.get("x-forwarded-proto") || "https";
    return `${proto}://${host}`;
}

function pickOrigin(headers?: HeadersInit): string {
    const allowed = parseAllowedSites().map(normalizeOrigin);
    if (!isServer && typeof window !== "undefined") {
        const origin = window.location.origin.replace(/\/+$/, "");
        return allowed.length ? (allowed.includes(origin) ? origin : allowed[0]) : origin;
    }
    const detected = detectServerOrigin(headers);
    if (detected) {
        const det = normalizeOrigin(detected);
        return allowed.length ? (allowed.includes(det) ? det : allowed[0]) : det;
    }
    const vercel = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
    if (vercel) {
        const det = normalizeOrigin(vercel);
        return allowed.length ? (allowed.includes(det) ? det : allowed[0]) : det;
    }
    return allowed[0] || "http://localhost:3000";
}

function resolveGraphqlUri(headers?: HeadersInit): string {
    // Always use /api route for client-side to avoid CORS issues
    // The API route will proxy to the actual GraphQL endpoint
    if (!isServer) {
        return "/api";
    }
    // On server-side, use the direct endpoint if provided, otherwise use /api
    if (GRAPHQL_URI_ENV && /^https?:\/\//i.test(GRAPHQL_URI_ENV)) {
        return GRAPHQL_URI_ENV;
    }
    return `${pickOrigin(headers)}/api`;
}

export function createApolloClient(opts?: { headers?: HeadersInit }): ApolloClient<NormalizedCacheObject> {
    const cache = new InMemoryCache();

    if (ENABLE_CACHE && !isServer) {
        persistCache({
            cache,
            storage: new LocalStorageWrapper(window.localStorage),
        })
            .then(() => console.log("[Cache Persist] ready"))
            .catch((err) => console.error("[Cache Persist] failed to restore", err));
    }

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            );
        }
        if (networkError) {
            // Check for CORS errors
            const errorMessage = networkError.message || String(networkError);
            if (errorMessage.includes('CORS') || errorMessage.includes('Access-Control-Allow-Origin')) {
                console.error(`[CORS error]: Cross-origin request blocked. Please check server CORS configuration.`);
            } else {
                console.error(`[Network error]: ${networkError}`);
            }
        }
    });

    const loggerLink = new ApolloLink((operation, forward) => {

        return forward(operation).map((response: FetchResult<Record<string, unknown>>) => {
            return response;
        });
    });

    const isOnline = (): boolean => (typeof navigator !== "undefined" ? navigator.onLine : true);

    const ttlMs = 60_000;
    const lastFetch = new Map<string, number>();
    const ttlLink = new ApolloLink((operation: Operation, forward: NextLink) => {
        const key = operation.operationName || "anon";
        const now = Date.now();
        const prev = lastFetch.get(key) || 0;
        const withinTTL = now - prev < ttlMs;

        let policy: FetchPolicy;
        if (!ENABLE_CACHE) {
            policy = "network-only";
        } else if (withinTTL || !isOnline()) {
            policy = "cache-first";
        } else {
            policy = "network-only";
            lastFetch.set(key, now);
        }

        operation.setContext((ctx: Record<string, unknown>) => ({
            ...ctx,
            __policy: policy,
        }));

        return forward(operation);
    });

    const graphqlUri = resolveGraphqlUri(opts?.headers);
    const isDirectEndpoint = graphqlUri.startsWith('http://') || graphqlUri.startsWith('https://');
    
    const httpLink = new HttpLink({
        uri: graphqlUri,
        fetchOptions: { 
            credentials: "same-origin", 
            mode: "cors" as RequestMode,
        },
        headers: {
            "Content-Type": "application/json",
            // Only add X-API-KEY header if we're making a direct request (not through /api route)
            // The /api route will handle adding the API key from server-side env vars
            ...(isDirectEndpoint && process.env.NEXT_PUBLIC_X_API_KEY && {
                "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
            }),
        },
    });

    const link = from([errorLink, loggerLink, ttlLink, httpLink]);

    const client = new ApolloClient({
        link,
        cache,
        ssrMode: isServer,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: ENABLE_CACHE ? "cache-first" : "network-only",
                nextFetchPolicy: ENABLE_CACHE ? "cache-first" : "network-only",
            },
            query: {
                fetchPolicy: ENABLE_CACHE ? "cache-first" : "network-only",
            },
        },
    });


    return client;
}

let browserClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient(opts?: { headers?: HeadersInit }): ApolloClient<NormalizedCacheObject> {
    if (!isServer) {
        if (!browserClient) browserClient = createApolloClient();
        return browserClient;
    }
    return createApolloClient(opts);
}

export const apolloClient = getApolloClient();

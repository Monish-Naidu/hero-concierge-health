import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests - show API info
export async function GET() {
  return NextResponse.json({
    message: 'GraphQL API Proxy',
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://192.168.1.19:8082/api/websites/v1',
    apiKeyConfigured: !!process.env.NEXT_PUBLIC_X_API_KEY,
    methods: ['POST', 'OPTIONS'],
    note: 'This endpoint only accepts POST requests for GraphQL queries',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get API URL and key from environment variables
    // On server-side, NEXT_PUBLIC_ vars are available but we should also check regular vars
    const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 
                   process.env.GRAPHQL_ENDPOINT || 
                   'http://192.168.1.19:8082/api/websites/v1';
    
    // Try multiple sources for API key
    const apiKey = process.env.NEXT_PUBLIC_X_API_KEY?.trim() || 
                   process.env.X_API_KEY?.trim() ||
                   request.headers.get('x-api-key')?.trim(); // Fallback to header if provided

    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Route] Endpoint:', apiUrl);
      console.log('[API Route] API Key present:', !!apiKey);
      console.log('[API Route] API Key length:', apiKey?.length || 0);
      console.log('[API Route] API Key first 10 chars:', apiKey?.substring(0, 10) || 'N/A');
      console.log('[API Route] Env vars check:', {
        hasNEXT_PUBLIC_X_API_KEY: !!process.env.NEXT_PUBLIC_X_API_KEY,
        hasX_API_KEY: !!process.env.X_API_KEY,
      });
    }

    // Build headers using Headers object to ensure proper transmission
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    // Always add API key if available
    if (apiKey) {
      const trimmedKey = apiKey.trim();
      requestHeaders.set('X-API-KEY', trimmedKey);
      
      // Debug: Log headers being sent (without exposing full key)
      if (process.env.NODE_ENV === 'development') {
        console.log('[API Route] X-API-KEY header set:', {
          length: trimmedKey.length,
          firstChars: trimmedKey.substring(0, 10),
          lastChars: trimmedKey.substring(trimmedKey.length - 10),
        });
        console.log('[API Route] Request URL:', apiUrl);
        console.log('[API Route] Request method: POST');
        console.log('[API Route] Headers count:', requestHeaders.keys ? Array.from(requestHeaders.keys()).length : 'N/A');
      }
    } else {
      console.warn('[API Route] Warning: No API key found in environment variables');
      return NextResponse.json(
        { errors: [{ message: 'API key is missing. Please configure NEXT_PUBLIC_X_API_KEY in .env.local' }] },
        { status: 500 }
      );
    }

    // Forward the request to the actual GraphQL endpoint
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('[API Route] Making fetch request...');
      console.log('[API Route] Request body preview:', JSON.stringify(body).substring(0, 200));
      // Log all headers being sent
      const headersArray: string[] = [];
      requestHeaders.forEach((value, key) => {
        if (key === 'X-API-KEY') {
          headersArray.push(`${key}: ${value.substring(0, 10)}...${value.substring(value.length - 10)}`);
        } else {
          headersArray.push(`${key}: ${value}`);
        }
      });
      console.log('[API Route] Request headers:', headersArray);
    }

    const response = await fetch(apiUrl, fetchOptions);

    // Debug: Log response status and headers
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Route] Response status:', response.status, response.statusText);
      console.log('[API Route] Response headers:', Object.fromEntries(response.headers.entries()));
    }

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || `HTTP ${response.status}: ${response.statusText}` };
      }
      
      // Log detailed error info in development
      if (process.env.NODE_ENV === 'development') {
        console.error('[API Route] Error response:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          errorText: errorText.substring(0, 500), // First 500 chars
        });
      }
      
      return NextResponse.json(
        { 
          errors: Array.isArray(errorData.errors) 
            ? errorData.errors 
            : [{ message: errorData.message || `Server returned ${response.status}` }]
        },
        { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
          },
        }
      );
    }

    const data = await response.json();

    // Return the response with CORS headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        errors: [{ 
          message: error instanceof Error ? error.message : 'Internal server error' 
        }] 
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
    },
  });
}


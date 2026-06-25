"use client";

import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/api/apollo-client";

interface Props {
    children: ReactNode;
}

export const ApolloProviderWrapper = ({ children }: Props) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};


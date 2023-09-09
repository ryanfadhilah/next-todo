"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import React from "react";

type typeProvider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type typeProviders = Record<string, typeProvider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<typeProviders | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <>
        {Object.values(providers).map((v: typeProvider, i, a) => {
          return (
            <button
              key={i}
              onClick={() => signIn(v?.id)}
              className=" md:text-base text-xs w-full h-full"
            >
              SIGN IN
            </button>
          );
        })}
      </>
    );
  }
};

export default AuthProviders;

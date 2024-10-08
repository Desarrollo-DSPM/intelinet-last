"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserValidation = () => {
    const { auth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (JSON.parse(auth?.modules || "[]").length === 0) {
            router.push("/dashboard");
        }
    });

    return null;
}
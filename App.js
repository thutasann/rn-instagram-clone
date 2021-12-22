import * as React from "react";
import AuthNavigation from "./AuthNavigation";
import { StatusBar } from "expo-status-bar";

export default function App () {
    return (
        <>
            <AuthNavigation/>
            <StatusBar style="light" backgroundColor="black" />
        </>
    )
};

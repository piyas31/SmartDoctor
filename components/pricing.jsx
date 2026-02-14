"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { PricingTable } from "@clerk/nextjs";

const Pricing = () => {
  return (
    <Card className="border-white/10 shadow-2xl bg-[#050505] backdrop-blur-xl rounded-[2rem] overflow-hidden">
      <CardContent className="p-0 md:p-4"> 
    
        <PricingTable
          appearance={{
            variables: {
              colorPrimary: "#22c55e", 
              colorBackground: "#0a0a0a", 
              colorText: "#ffffff", 
              colorTextSecondary: "#a1a1aa",
            },
            elements: {
              card: {
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "transparent",
              },
              button: {
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
              },
              drawerRoot: {
                zIndex: 2000,
              },
            },
          }}
          checkoutProps={{
            appearance: {
              variables: {
                colorPrimary: "#22c55e",
              },
              elements: {
                drawerRoot: {
                  zIndex: 2000,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Pricing;
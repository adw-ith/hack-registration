"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute w-full z-50 bg-slate grid grid-cols-2 text-white px-6 md:px-12 lg:px-24 py-4">
      <div className="col-span-1">
        <Image
          src="/hack.png"
          className="w-32"
          alt=""
          width={200}
          height={100}
        />
      </div>
      <div className="col-span-1 flex justify-end gap-x-8">
        <span className=" hover:text-orange-500">
          <a
            className=" hover:text-orange-500"
            href="https://hack24.ieemace.org"
          >
            Home
          </a>
        </span>
        <span className=" hover:text-orange-500">
          <a href="https://hack24.ieeemace.org/#contact">Contact</a>
        </span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useCnails } from "../contexts/cnails";
import CoursesList from "../components/index/CoursesList";
import ContainersList from "../components/index/ContainersList";
import Loader from "../components/Loader";
import { containerAPI } from "../lib/api/containerAPI";
import { generalAPI } from "../lib/api/generalAPI";
import { Course, Container, ContainerInfo } from "../lib/cnails";
import { SandboxWrapper } from "../components/SandboxWrapper";

export default function Home() {
  // load once when page is rendered
  return (
    <div className="flex flex-col mx-6 space-y-4">
      <ContainersList></ContainersList>
      <SandboxWrapper />
      <CoursesList></CoursesList>
    </div>
  );
}

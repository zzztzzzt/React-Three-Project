'use client';

import styles from "./page.module.css";
import { useState } from "react";
import GLBViewer from './components/GLBViewer';
import GuideElements from './components/GuideElements';
import NewsBars from './components/NewsBars';
import InfoArea from './components/InfoArea';

export default function Home() {
  return (
    <>
      <div id="viewer-container">
        <GLBViewer />
      </div>
      <GuideElements />
      <NewsBars />
      <InfoArea />
    </>
  );
}
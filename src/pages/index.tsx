import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import ExpoForm from "../components/enquiry/ExpoForm";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ExpoForm></ExpoForm>
    </div>
  );
};

export default Home;

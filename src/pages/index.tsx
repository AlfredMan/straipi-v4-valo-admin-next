import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import ExpoForm from "../components/enquiry/ExpoForm";
import api from "../utils/api";

// const Home: NextPage = () => {
const Home = ({
  availablePackages,
  availableServices,
}: NextPage & {
  availablePackages: Array<any>;
  availableServices: Array<any>;
}) => {
  return (
    <div className={styles.container}>
      <ExpoForm
        availablePackages={availablePackages}
        availableServices={availableServices}
      ></ExpoForm>
    </div>
  );
};

export default Home;
export async function getStaticProps() {
  const { data: availablePackages } = await api.get("available-packages");

  console.log("availablePackages", availablePackages);
  const { data: availableServices } = await api.get("available-services");
  console.log("availabeServices", availablePackages);
  return {
    props: { availablePackages, availableServices },
    // revalidate: 10
  };
}

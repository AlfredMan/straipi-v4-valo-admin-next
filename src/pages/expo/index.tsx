import React from "react";
import ExpoForm from "../../components/enquiry/ExpoForm";
import api from "../../utils/api";

function Expo({
  availablePackages,
  availableServices,
}: {
  availablePackages: Array<any>;
  availableServices: Array<any>;
}) {
  return (
    <ExpoForm
      availablePackages={availablePackages}
      availableServices={availableServices}
    ></ExpoForm>
  );
}

export default Expo;

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

import React from "react";

import { useParams } from "react-router-dom";

import DMTable from "../../components/Tables/DMTable";
import MITable from "../../components/Tables/MITable";
import MPTTable from "../../components/Tables/MPTTable";
import "./DossierDetails.scss";

const DossierDetails = () => {
  const params = useParams();
  return (
    <div className="dossier-details__container">
      <h1>Dossier {params.dossierId}</h1>
      <h2>Dommage au biens</h2>
      <DMTable />
      <h2>Mesures d'interventions</h2>
      <MITable />
      <h2>Mesure préventif temporaire</h2>
      <MPTTable />
    </div>
  );
};

export default DossierDetails;

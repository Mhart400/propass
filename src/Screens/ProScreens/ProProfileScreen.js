import React from "react";
import Layout from "../../Components/Layout/Layout";

function ProProfileScreen() {
  return (
    <Layout>
      <p>This page will contain:</p>
      <ul>
        <li>Set your profile picture</li>
        <li>Update your information</li>
        <li>List your qualifications & specialties</li>
        <li>Payment details (Stripe credentials)</li>
      </ul>
    </Layout>
  );
}

export default ProProfileScreen;

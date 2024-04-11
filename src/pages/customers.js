import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";

import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";

import axios from "axios";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [lengthCustomer, setLengthCustomers] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/rates").then((response) => {
      const length = lengthCustomer;
      const newCustomers = [];

      for (let i = 0; i < length; i++) {
        newCustomers.push(response.data[0][i]);
      }
      setCustomers(newCustomers);
    });

    axios.get("http://localhost:5000/last").then((response) => {
      const lengthCustomer = response.data[0].length;
      setLengthCustomers(lengthCustomer);
    });
  }, [customers]);

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;

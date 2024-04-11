import Head from "next/head";
import { Box, Container, Grid, responsiveFontSizes } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { MainChart } from "../components/dashboard/main-chart";

import axios from "axios";

const Dashboard = () => {
  const [previousRate, setPreviousRate] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [lastRate, setLastRate] = useState([]);
  const [arr, setArr] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/rates");
        const lengthCustomer = customers.length;
        //pobranie podwójnej długości tej tablicy do odczytania poprzedniej tury odczytów
        const lenghtPreviousCustomer = lengthCustomer * 2;

        const prev = [];
        const last = [];
        for (let i = 0; i < lengthCustomer; i++) last.push(response.data[0][i].Amount);
        
        for (let i = 0 + lengthCustomer; i < lenghtPreviousCustomer; i++) prev.push(response.data[0][i].Amount);
    
        setLastRate(last);
        setPreviousRate(prev);
      
      } catch (e) {
        console.log(e);
      }
    })();
  }, [lastRate]);

  //przechwycenie odczytów z ostatniego tygodnia, oraz zamiana ich na tablicę w odpowiednim formacie odpowiadającemu wymogom biblioteki chart.js
  useEffect(() => {
    (async () => {
      try {
     
        const response = await axios.get("http://localhost:5000/lastday");
        const res = response.data[0];

        //Przerobienie tablicy, aktualna tablica to tablica z obiektami o przypisanych ID, jednak bez jakiegokolwiek grupowania (około 20 tysiecy elementów jeden po drugim). Wymogiem chart.js jest tablica, która ma tyle elementów ile indeksów giełdowych a odczyty są umieszczone jako element obiektu, który jest nową tablicą
        const objIds = res.reduce((a, { ExchangeCompanyId, Name, Date: dates, Amount: data }) => {
          a[ExchangeCompanyId] = a[ExchangeCompanyId] || {
            ExchangeCompanyId,
            Name,
            dates: [],
            data: [],
          };
          return {
            ...a,
            ...{
              //wzor nowej tablicy z dodatkiem elementów potrzebnych dla chart.js
              [ExchangeCompanyId]: {
                label: Name,
                fill: false,
                borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                data: a[ExchangeCompanyId].data.concat(data),
                dates: a[ExchangeCompanyId].dates.concat(dates),
              },
            },
          };
        }, {});
        const result = Object.values(objIds);
      
        setArr(result);

        //inicjalizacja etykiet odczytów - aktualnie jest to po prostu numer odczytu, lecz docelowo mogą być to daty

        setLabels(result[0].dates);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  //aktualizacja listy indeksów
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/last");
        const lengthCustomer = response.data[0].length;

        const newCustomers = [];

        for (let i = 0; i < lengthCustomer; i++) {
          newCustomers.push(response.data[0][i].Name);
        }
        setCustomers(newCustomers);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Giełda</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget previousRate={previousRate} lastRate={lastRate} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers customers={customers} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress
                previousRate={previousRate}
                lastRate={lastRate}
                customers={customers}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit
                previousRate={previousRate}
                lastRate={lastRate}
                customers={customers}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <MainChart arr={arr} labels={labels} />
            </Grid>

            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Sales previousRate={previousRate} lastRate={lastRate} customers={customers} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

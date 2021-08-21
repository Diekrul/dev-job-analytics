import { CircularProgress, Select, theme } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologiesData,
} from "../../api";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { SearchBar } from "../search-bar/SearchBar";
import "./../../styles/detail.scss";
import { DetailChart } from "./DetailChart";
import { DetailChartTag } from "./DetailChartTag";
import { DetailCountry } from "./DetailCountry";
import { DetailStackOverFlowChart } from "./DetailStackOverFlowChart";

interface Point {
  x: string; //date
  y: number;
}

export interface ChartLine {
  id: string;
  color: string;
  data: Point[];
}

export const Detail = () => {
  const [technologies, setTechnologies] = useState([]);
  const [formattedChartData, setFormattedChartData] = useState<ChartLine[]>([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTechnologiesData = () => {
    const getData = async () => {
      const technologiesResult = await fetchTechnologiesData();
      setFormattedChartData(technologiesResult);
    };
    getData();
  };

  const getTechnologiesByCountriesData = () => {
    const getData = async () => {
      const countriesResult = await fetchCountriesData();
      setTechnologies(countriesResult);
    };
    getData();
  };

  const getStackOverFlowData = () => {
    const getData = async () => {
      const questionsResult = await fetchQuestionsData();
      setQuestions(questionsResult);
    };
    getData();
  };

  useEffect(() => {
    getTechnologiesData();
    getTechnologiesByCountriesData();
    getStackOverFlowData();
    setIsLoading(false);
  }, []);

  const removeElementOnChart = (chartID: string) => {
    let currentFormattedData = [...formattedChartData];
    const indexOfElementToRemove = currentFormattedData.findIndex(
      (value: any) => value.id === chartID
    );
    currentFormattedData.splice(indexOfElementToRemove, 1);
    setFormattedChartData([...currentFormattedData]);
  };

  return isLoading ? (
    <CircularProgress isIndeterminate color="green.300" />
  ) : (
    <div className="detail-container">
      <div className="color-switcher">
        <ColorModeSwitcher />
      </div>
      <div className="technologies-input-container">
        <SearchBar />
        <Select
          size="lg"
          borderColor="grey"
          color={theme.colors.teal}
          value={"01/08/2021"}
          maxWidth={"200px"}
          placeholder={"August 2021 "}
        />
      </div>

      <DetailChartTag
        removeElementOnChart={removeElementOnChart}
        formattedChartData={formattedChartData}
      />

      <div className="detail-chart-container">
        <DetailChart formattedChartData={formattedChartData} />
        {/* <div className="stats-container">
          <Card percentage={7.8} value={101127} title={"React"}></Card>
          <Card percentage={-12.3} value={23018} title={"Angular"}></Card>
        </div> */}
      </div>

      <div className="detail-chart-country">
        <DetailCountry chartData={technologies} />
      </div>
      <div className="detail-chart-container">
        <DetailStackOverFlowChart formattedChartData={questions} />
      </div>
    </div>
  );
};

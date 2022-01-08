import moment from "moment";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import api from "../../utils/api";
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import {
  CompositeFilterDescriptor,
  orderBy,
  SortDescriptor,
  State,
  process,
} from "@progress/kendo-data-query";
const parseEnquiries = (enquiries: Array<any>) => {
  if (!enquiries) {
    return [];
  }
  const parsedData = enquiries.map((e) => {
    const {
      services: packageServices,
      interestedPackage,
      ...strippedEnquiry
    } = e;
    const parsedEnquiry = {
      ...strippedEnquiry,
    };
    // services.forEach((service: any, i: number) => {
    //   parsedEnquiry[`service_${i}`] = {
    //     ...service,
    //     data: new Date(service.date),
    //   };
    // });
    parsedEnquiry.interestedPackage = interestedPackage.title;
    packageServices.forEach((packageService: any, i: number) => {
      parsedEnquiry[`service_${i}`] = packageService.service.serviceTitle;
      parsedEnquiry[`service_${i}_date`] = packageService.date;
      parsedEnquiry[`service_${i}_venues`] = packageService.venues;
    });
    return parsedEnquiry;
  });
  return parsedData;
};

const initialDataState: State = {
  sort: [{ field: "id", dir: "desc" }],
  take: 10,
  skip: 0,
};

export const Enquiries = () => {
  const _export = React.useRef<ExcelExport | null>(null);
  const excelExport = () => {
    console.log("exporting");
    if (_export.current !== null) {
      _export.current.save();
    }
  };
  const [rowData, setRowData] = useState([] as Array<any>);
  const [dataState, setDataState] = React.useState<State>(initialDataState);

  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(true);
  useEffect(() => {
    (async () => {
      const { data: enquiries } = await api.get("enquiries");
      if (enquiries) {
        const parsedEnquiries = parseEnquiries(enquiries);
        if (parsedEnquiries) {
          setRowData(parsedEnquiries);
        }
      }
      setIsLoadingEnquiries(false);
    })();
  }, []);

  return (
    <div className="h-full relative w-full">
      <ExcelExport data={rowData} ref={_export}>
        <Grid
          // pageable={true}
          sortable={true}
          filterable={true}
          style={{ height: "100%" }}
          data={process(rowData, dataState)}
          {...dataState}
          onDataStateChange={(e: GridDataStateChangeEvent) => {
            setDataState(e.dataState);
          }}
        >
          <GridToolbar>
            <div className="w-full flex justify-end">
              <button
                title="Export Excel"
                className="k-button k-primary"
                onClick={excelExport}
              >
                Export to Excel
              </button>
            </div>
          </GridToolbar>
          <GridColumn field="id" title="id" width="40px" />
          <GridColumn field="heardAboutUsFrom" title="From" width="250px" />
          <GridColumn field="name1" title="Name1" />
          <GridColumn field="name2" title="Name2" />
          <GridColumn field="email1" title="Email1" />
          <GridColumn field="interestedPackage" title="Package" />
          <GridColumn field="service_0" title="Service 1" />
          <GridColumn field="service_0_date" title="Service 1 Date" />
          <GridColumn field="service_0_venues" title="Service 1 Venues" />
          <GridColumn field="note" title="Note" />
          <GridColumn field="submittedBy" title="Submitted by" />
        </Grid>
      </ExcelExport>
    </div>
  );
};

export default Enquiries;

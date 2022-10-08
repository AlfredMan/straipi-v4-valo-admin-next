import moment from "moment";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import api from "../../utils/api";
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridDataStateChangeEvent,
  GridToolbar,
  GRID_COL_INDEX_ATTRIBUTE,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import {
  CompositeFilterDescriptor,
  orderBy,
  SortDescriptor,
  State,
  process,
} from "@progress/kendo-data-query";
import { useTableKeyboardNavigation } from "@progress/kendo-react-data-tools";
import { enquiriesV3, EnquiryV3 } from "./enquiries_v3";
import {availableServices} from "./v3_data"

export const ImportToV4 = () => {

  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(true);
  useEffect(() => {
    (async () => {
      // const { data: {id,attributes} } = await api.post("available-services");

      const response = await Promise.all(
        availableServices.map((s) => {
          const {id,attributes:availableService}=s

          return api.post("available-services", {...availableService});
        })
      );
      // if (enquiries) {
      //   console.log("raw enquiries", enquiries);
      //   const parsedEnquiries = parseEnquiries(enquiries);
      //   if (parsedEnquiries) {
      //     setRowData(parsedEnquiries);
      //   }
      // }
      console.log(response);

      setIsLoadingEnquiries(false);
    })();
  }, []);

  return <div className="h-full relative w-full">
    <div>is loading:{isLoadingEnquiries}</div>
  </div>;
};

export default ImportToV4;

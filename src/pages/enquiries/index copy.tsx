import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import * as React from 'react';
import { useRef, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import api from '../../utils/api';


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

export const Enquiries = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(true);
  const [enquiries, setEnquries] = useState([] as Array<any>);
  const gridRef = useRef(null);
  // useEffect(() => {
  //   (async () => {
  //     const { data: enquiries } = await api.get('enquiries');
  //     if (enquiries) {
  //       const parsedEnquiries = parseEnquiries(enquiries);
  //       if (parsedEnquiries) {
  //         setEnquries(parsedEnquiries);
  //       }
  //     }
  //     debugger;
  //     setIsLoadingEnquiries(false);
  //   })();
  // }, []);

  // const onGridReady = (params: any) => {
  //   // params.api.autoSizeColumns();
  //   // setGridApi(params.api);
  //   // setGridColumnApi(params.columnApi);
  //   // const updateData = (data) => params.api.setRowData(data);
  //   // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //   //   .then((resp) => resp.json())
  //   //   .then((data) => updateData(data));
  // };
  const autoSizeColumns = (params: any) => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map((col: any) => col.getColId());

    params.columnApi.autoSizeColumns(colIds);
  };

  const onGridReady = (params: any) => {
    // params.api.autoSizeColumns();
    params.api.sizeColumnsToFit();
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data: any) => {
      setRowData(data);
    };
    // debugger;

    // fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => updateData(data));

    (async () => {
      const { data: enquiries } = await api.get('enquiries');
      if (enquiries) {
        const parsedEnquiries = parseEnquiries(enquiries);
        if (parsedEnquiries) {
          // setEnquries(parsedEnquiries);
          updateData(parsedEnquiries);
        }
      }
      setIsLoadingEnquiries(false);
    })();
  };
  const getAllRows = () => {
    if (!gridApi) {
      return [];
    }
    const rowData = [] as Array<any>;
    (gridApi as any).forEachNode((node: any) => rowData.push(node.data));
    return rowData;
  };
  const onBtExport = () => {
    // (gridApi as any)?.exportDataAsExcel();
    if (!gridColumnApi) {
      return;
    }
    // const g = gridApi;
    // const r = rowData;

    // const c = gridColumnApi;
    const r = getAllRows();

    // const columnHeaders = (gridColumnApi as any)
    //   .getAllColumns()
    //   .map(
    //     (c: any) =>
    //       c.userProvidedColDef.headerName || c.userProvidedColDef.field
    //   );
    // const rows = [
    //   ['name1', 'city1', 'some other info'],
    //   ['name2', 'city2', 'more info'],
    // ];

    if (!rowData || (rowData as Array<any>)?.length === 0) {
      return;
    }
    const headers = Object.keys(rowData[0]);
    // const rows=(rowData.map(rd=>Object.values(rd))
    const rows = (rowData as Array<any>).map((row: any) =>
      Object.values(row).map((v: any) =>
        // encodeURIComponent(v)
        {
          if (typeof v === 'string') {
            // if (v.startsWith('test multiline1')) {
            //   const t = 0;
            //   debugger;
            // }
            // return v?.replace('\n', '<br/>');
            const parsed = v?.replace('\n', '<br/>').replace(',', '<comma/>');

            return parsed;
            // return encodeURIComponent(v)
          } else {
            return v;
          }
        }
      )
    );
    // const rows = rowData ? [...rowData] : ([] as Array<any>);
    const headersAndRows = [headers, ...rows];
    // debugger;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headersAndRows.map((e) => e.join(',')).join('\r\n');
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  };

  return (
    <div className='h-full relative w-full'>
      {/* {isLoadingEnquiries && <div>Loading enquiries...</div>} */}
      <div className='flex justify-end w-full'>
        <button
          onClick={() => onBtExport()}
          style={{ marginBottom: '5px', fontWeight: 'bold' }}
          className='bg-blue-900 font-normal px-4 py-2 text-lg text-white'
        >
          Export to Excel
        </button>
      </div>
      <div
        className='ag-theme-alpine h-full relative w-full'
        // style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          // rowData={enquiries}
          rowData={rowData}
          onGridReady={onGridReady}
          defaultColDef={{
            resizable: true,
            filter: true,
            sortable: true,
          }}
          onFirstDataRendered={autoSizeColumns}
        >
          <AgGridColumn headerName='Id' field='id'></AgGridColumn>
          <AgGridColumn
            headerName='From'
            field='heardAboutUsFrom'
            // width={150}
          ></AgGridColumn>
          <AgGridColumn field='name1' width={150}></AgGridColumn>
          <AgGridColumn field='name2' width={150}></AgGridColumn>
          <AgGridColumn field='email1'></AgGridColumn>
          <AgGridColumn
            headerName='Package'
            // field='interestedPackage.title'
            field='interestedPackage'
            // width={470}
          ></AgGridColumn>
          <AgGridColumn
            headerName='Service 1'
            // field='service_0.service.serviceTitle'
            field='service_0'
            // width={330}
          ></AgGridColumn>
          <AgGridColumn
            headerName='Service 1 Date'
            // field='service_0.date'
            field='service_0_date'
            // sortable={true}
            // filter={true}
            // resizable={true}
            cellRenderer={(params) => {
              // put the value in bold
              return moment(params.value).format('YYYY-MM-DD');
            }}
            // width={150}
          ></AgGridColumn>
          <AgGridColumn
            headerName='Service 1 Venues'
            // field='service_0.date'
            field='service_0_venues'
            // sortable={true}
            // filter={true}
            // resizable={true}
            // width={150}
          ></AgGridColumn>
          <AgGridColumn
            headerName='Note'
            field='note'
            // sortable={true}
            // filter={true}
            // resizable={true}
            width={300}
          ></AgGridColumn>
          <AgGridColumn
            headerName='Submitted by'
            field='submittedBy'
            // sortable={true}
            // filter={true}
            // resizable={true}
            width={300}
          ></AgGridColumn>

          {/* <AgGridColumn
              headerName='Service 2'
              field='service_1.service.serviceTitle'
              width={330}
            ></AgGridColumn>
            <AgGridColumn
              headerName='Service 2 Date'
              field='service_1.date'
              cellRenderer={(params) => {
                // put the value in bold
                return params?.value
                  ? moment(params.value).format('YYYY-MM-DD')
                  : '';
              }}
              width={150}
            ></AgGridColumn>
            <AgGridColumn
              headerName='Service 3'
              field='service_2.service.serviceTitle'
            ></AgGridColumn>
            <AgGridColumn
              headerName='Service 3 Date'
              field='service_2.date'
              cellRenderer={(params) => {
                // put the value in bold
                return params?.value
                  ? moment(params.value).format('YYYY-MM-DD')
                  : '';
              }}
            ></AgGridColumn> */}
        </AgGridReact>
      </div>
    </div>
  );
};

export default Enquiries;

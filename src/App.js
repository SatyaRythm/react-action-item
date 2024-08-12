import "./App.css";
import CardComponent from "./components/cardComponent";
import {
  FaHouse,
  FaSun,
  FaPencil,
  FaChevronDown,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { IoIosRefresh, IoIosSearch } from "react-icons/io";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {React, useCallback, useEffect, useMemo, useState } from "react";
import { result } from "./data/actionItems";
import { closedData } from "./data/closedActionItems";
import { openData } from "./data/openActionItems";
import { overDue } from "./data/overDueActionItems";
// import { useLocation } from "react-router-dom";

// {
//   allActionItems,
//   overdueActionItems,
//   openActionItems,
//   closedActionItems,
//    currentPageReference
// }

function App( 
  // {
  //   allActionItems,
  //   overdueActionItems,
  //   openActionItems,
  //   closedActionItems,
  //   // pageReferences
  // }
) {
  const [actionItemsData, setActionItemsData] = useState(result);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [type, setType] = useState("All");
  // const location = useLocation();
  const status = [
    {
      name: "Open",
      length: openData.length,
    },
    {
      name: "Closed",
      length: closedData.length,
    },
    {
      name: "Overdue",
      length: overDue.length,
    },
    {
      name: "All",
      length: result.length,
    },
  ];


  const handleStatusData = (itemStatus) => {
    console.log(itemStatus);
    if (itemStatus === "Open") {
      setRowsPerPage(20);
      setPage(1);
      setActionItemsData(openData);
    } else if (itemStatus === "Closed") {
      setRowsPerPage(20);
      setPage(1);
      setActionItemsData(closedData);
    } else if (itemStatus === "Overdue") {
      setRowsPerPage(20);
      setPage(1);
      setActionItemsData(overDue);
    } else {
      setRowsPerPage(20);
      setPage(1);
      setActionItemsData(result);
    }
    setType(itemStatus);
  };

  // useEffect(() => {
  //   console.log(window.location.href, "currentPageReference react");
  // },[items, topContent, bottomContent])

  const filteredItems = useMemo(() => {
    let filteredData = [...actionItemsData];

    filteredData = filteredData.filter((data) =>
      data.Name.toLowerCase().includes(filterValue.toLowerCase())
    );

    return filteredData;
  }, [actionItemsData, filterValue]);

  let pages = Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((key) => {
    console.log(key);
    setRowsPerPage(Number(key));
    setPage(1);
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-200 p-2 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-4 bg-blue-300 rounded-lg flex flex-col items-center">
              <FaHouse className="text-gray-500" />
              <p>House</p>
            </div>
            <div>
              <p className="text-start">Action items</p>
              <p className="text-xl font-bold text-start">{type}</p>
            </div>
          </div>
          <p className="text-start">
            {actionItemsData.length} items • Sorted by Status • Filtered by {type} action items • Updated an hour ago
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="shadow"
              className="mb-3 w-full md:w-1/2"
            >
              New
            </Button>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  color="primary"
                  variant="shadow"
                  className="mb-3 w-full md:w-1/2"
                  endContent={<FaChevronDown className="text-small" />}
                >
                  Rows Per Page: {rowsPerPage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={rowsPerPage.toString()}
                onAction={(key) => onRowsPerPageChange(key)}
              >
                <DropdownItem key={20}>20</DropdownItem>
                <DropdownItem key={30}>30</DropdownItem>
                <DropdownItem key={40}>40</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex gap-3">
            <Input
              isClearable
              type="text"
              className="h-[2rem]"
              placeholder="Search this list..."
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
              startContent={<IoIosSearch />}
            />
            <div className="p-3 bg-blue-300 rounded-lg h-[2.5rem] cursor-pointer">
              <FaSun className="" />
              {/* <p>Sun</p> */}
            </div>
            <div className="p-3 bg-blue-300 rounded-lg h-[2.5rem] cursor-pointer">
              <IoIosRefresh className="" />
              {/* <p>Refresh</p> */}
            </div>
            <div className="p-3 bg-blue-300 rounded-lg h-[2.5rem] cursor-pointer">
              <FaPencil className="" />
              {/* <p>Pencil</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    onSearchChange,
    actionItemsData.length,
    rowsPerPage,
    onClear,
    type,
  ]);

  const actions = () => {
    return (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <FaEllipsisVertical className="text-default-300" />
              {/* <p>Options</p> */}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>View</DropdownItem>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  // console.log(<img src={`https://rhythm-demo-proto-dev-ed.develop.lightning.force.com${items[0].Flag_Status__c.match(/src="([^"]*)"/)[1]}`} />);

  // console.log(items[0].Flag_Status__c.match(/src="([^"]*)"/));

  // console.log(items, "items")

  if(items && bottomContent && topContent){
    return (
      <div className="App py-5">
        <div className="flex flex-col md:flex-row gap-5 mx-4 bg-black py-5 px-3 rounded-xl">
          {status.map((item) => (
            <CardComponent
              item={item.name}
              handleStatusData={handleStatusData}
              key={item}
              length={item.length}
            />
          ))}
        </div>
        <div className="mt-5 mx-4">
          <Table
            aria-label="action items table w-full overflow-auto"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
            className=""
          >
            <TableHeader className="">
              <TableColumn>Name</TableColumn>
              <TableColumn>Related Record</TableColumn>
              <TableColumn>Supplier Name</TableColumn>
              <TableColumn>Assigned To</TableColumn>
              <TableColumn>Ownership</TableColumn>
              <TableColumn>Priority</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Flag Status</TableColumn>
              <TableColumn align="center">Actions</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"No data to display"}>
              {(item) => (
                <TableRow key={item?.Id}>
                  <TableCell><a target="_self" href={`/${item?.Id}`} rel="noreferrer noopener">{item?.Name}</a></TableCell>
                  <TableCell><a target="_self" href={`/${item?.Related_Record__c}`} rel="noreferrer noopener">{item?.Related_Record__r?.Name}</a></TableCell>
                  <TableCell><a target="_self" href={`/${item?.Supplier__c}`} rel="noreferrer noopener">{item?.Supplier__r?.Name}</a></TableCell>
                  <TableCell><a target="_self" href={`/${item?.Assigned_To__c}`} rel="noreferrer noopener">{item?.Assigned_To__r?.Name}</a></TableCell>
                  <TableCell><a target="_self" href={`/${item?.Ownership__c}`} rel="noreferrer noopener">{item?.OwnershipName__c}</a></TableCell>
                  <TableCell>{item?.Priority__c}</TableCell>
                  <TableCell>{item?.Status__c}</TableCell>
                  <TableCell><img src={`https://rhythm-demo-proto-dev-ed.develop.lightning.force.com${items[0].Flag_Status__c.match(/src="([^"]*)"/)[1]}`} alt="status flag" class="h-[2rem] w-1/2" /></TableCell>
                  <TableCell>{actions()}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;

// item?.Flag_Status__c?.substring(10, 30)

// <span className="w-[30%] text-small text-default-400">
//          {selectedKeys === "all"
//            ? "All items selected"
//            : `${selectedKeys.size} of ${filteredItems.length} selected`}
//        </span>


//  <a
              // target="_blank"
              // href={`https://twitter.com/${contact.twitter}`}
            // >
              // {contact.twitter}
            // </a>
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Select, Modal, notification } from "antd";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ComapnyTable from "../../components/Tables/ComapnyTable";

import { getCompany } from "../../store/company/action";
import CompanyRepository from "../../repositories/CompanyRepository";

const { Option } = Select;

const QBankMainCategory = () => {
  const dispatch = useDispatch();
  const { company, activeCount, inactiveCount } = useSelector(
    ({ company }) => company
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeTotal, setPageSizeTotal] = useState(10);
  const [tab, setTab] = useState("Y");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gst, setGST] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMobileNumber, setContactMobileNumber] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [status, setStatus] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState({});

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const re = /^[0-9\b]+$/; //rules

  useEffect(() => {
    getMainData();
  }, []);

  const getMainData = () => {
    let ctr = {
      status: tab,
    };
    ctr.start = currentPage === 1 ? 0 : (currentPage - 1) * pageSizeTotal;
    ctr.limit = pageSizeTotal;
    dispatch(getCompany(ctr));
  };

  const tabOnChange = (tab) => {
    setSearch("");
    let ctr = {
      status: tab,
    };
    ctr.start = 0;
    ctr.limit = pageSizeTotal;
    dispatch(getCompany(ctr));
    setTab(tab);
    setCurrentPage(1);
  };

  const addOnClick = () => {
    setName("");
    setEmail("");
    setMobileNumber("");
    setGST("");
    setAddress("");
    setContactName("");
    setContactMobileNumber("");
    setLat("");
    setLong("");
    setShowModal(true);
  };

  const editOnClick = (obj) => {
    setSelectedId(obj._id);
    setName(obj.name);
    setEmail(obj.email);
    setMobileNumber(obj.mobileNumber);
    setGST(obj.gst);
    setAddress(obj.address);
    setContactName(obj.contactName);
    setContactMobileNumber(obj.contactMobileNumber);
    setLat(obj.lat);
    setLong(obj.long);
    setStatus(obj.status);
    setShowModal(true);
  };

  const closeModalOnClick = () => {
    setSelectedId("");
    setName("");
    setEmail("");
    setMobileNumber("");
    setGST("");
    setAddress("");
    setContactName("");
    setContactMobileNumber("");
    setLat("");
    setLong("");
    setShowModal(false);
  };

  const nameOnChange = (value) => {
    setName(value);
    let errorObj = { ...error };
    errorObj["name"] = "";
    setError(errorObj);
  };

  const emailOnChange = (value) => {
    let errorObj = { ...error };
    if (value.match(isValidEmail)) {
      errorObj["email"] = "";
    } else {
      errorObj["email"] = "Please enter valid email";
    }
    setEmail(value);
    setError(errorObj);
  };

  const mobileNumberOnChange = (value) => {
    if (value === "" || re.test(value)) {
      setMobileNumber(value);
    }
    let errorObj = { ...error };
    errorObj["mobileNumber"] = "";
    setError(errorObj);
  };

  const gstOnChange = (value) => {
    setGST(value);
  };

  const addressOnChange = (value) => {
    setAddress(value);
    let errorObj = { ...error };
    errorObj["address"] = "";
    setError(errorObj);
  };

  const contactNameOnChange = (value) => {
    setContactName(value);
    let errorObj = { ...error };
    errorObj["contactName"] = "";
    setError(errorObj);
  };

  const contactMobileNumberOnChange = (value) => {
    if (value === "" || re.test(value)) {
      setContactMobileNumber(value);
    }
    let errorObj = { ...error };
    errorObj["contactMobileNumber"] = "";
    setError(errorObj);
  };

  const latOnChange = (value) => {
    setLat(value);
    let errorObj = { ...error };
    errorObj["lat"] = "";
    setError(errorObj);
  };

  const longOnChange = (value) => {
    setLong(value);
    let errorObj = { ...error };
    errorObj["long"] = "";
    setError(errorObj);
  };

  const statusOnChange = (status) => {
    setStatus(status);
  };

  const saveOnClick = async () => {
    let mailValid = email ? email.match(isValidEmail) : false;
    let mobileValid = mobileNumber && mobileNumber.length === 10 ? true : false;
    let contactMobileValid =
      contactMobileNumber && contactMobileNumber.length === 10 ? true : false;
    if (
      name &&
      email &&
      mobileNumber &&
      mailValid &&
      mobileValid &&
      contactName &&
      contactMobileNumber &&
      contactMobileValid &&
      address &&
      lat &&
      long
    ) {
      let payload = {
        name,
        email,
        mobileNumber,
        address,
        lat,
        long,
        contactName,
        contactMobileNumber,
      };
      if (gst) payload["gst"] = gst;
      if (selectedId) payload["status"] = status;
      if (selectedId) {
        update(payload);
      } else {
        save(payload);
      }
    } else {
      let errorObj = { ...error };
      if (!name) errorObj["name"] = "Please Enter Name";
      if (!email) errorObj["email"] = "Please Enter Email";
      if (!mailValid) errorObj["email"] = "Please Enter Email";
      if (!mobileNumber)
        errorObj["mobileNumber"] = "Please Enter Mobile Number";
      if (!mobileValid) errorObj["mobileNumber"] = "Please Enter Mobile Number";
      if (!contactName) errorObj["contactName"] = "Please Enter Contact Name";
      if (!contactMobileNumber)
        errorObj["contactMobileNumber"] = "Please Enter Contact Mobile Number";
      if (!address) errorObj["address"] = "Please Enter Address";
      if (!lat) errorObj["lat"] = "Please Enter Contact Lat";
      if (!long) errorObj["long"] = "Please Enter long";
      setError(errorObj);
    }
  };

  const save = async (payload) => {
    let result = await CompanyRepository.cretae(payload);
    if (result && result.status === 200) {
      getMainData();
      closeModalOnClick();
      notification.success({
        message: "Added Successfully.",
      });
    } else {
      notification.error({
        message: result.message ? result.message : "Something Wrong",
      });
    }
  };

  const update = async (payload) => {
    let result = await CompanyRepository.update(selectedId, payload);
    if (result && result.status === 200) {
      getMainData();
      closeModalOnClick();
      notification.success({
        message: "Updated Successfully.",
      });
    } else {
      notification.error({
        message: result.message ? result.message : "Something Wrong",
      });
    }
  };

  const pageSizeChange = async (page, pageSize) => {
    let ctr = {
      status: tab,
    };
    ctr.start = page === 1 ? 0 : (page - 1) * pageSize;
    ctr.limit = page * pageSize;
    if (search) ctr.search = search;
    dispatch(getCompany(ctr));
    setCurrentPage(page);
    setPageSizeTotal(pageSize);
  };

  const searchOnChange = (search) => {
    let ctr = {
      status: tab,
    };
    ctr.start = 0;
    ctr.limit = pageSizeTotal;
    ctr.search = search;
    dispatch(getCompany(ctr));
    setSearch(search);
    setCurrentPage(1);
  };

  console.log(company, "company");
  return (
    <div>
      <div className='page-header'>
        <h3 className='page-title'>
          <span className='page-title-icon bg-gradient-primary text-white mr-2'>
            <i className='mdi mdi-city'></i>
          </span>{" "}
          Company
        </h3>
      </div>
      <div className='row'>
        <div className='col-lg-12 grid-margin stretch-card mb-3'>
          <div className='card'>
            <Tabs
              id='fill-tab-example'
              className='mb-3'
              fill
              activeKey={tab}
              onSelect={(key) => tabOnChange(key)}
            >
              <Tab
                eventKey='Y'
                title={`Active ${0}`}
                tabClassName='text-success'
              />
              <Tab
                eventKey='N'
                title={`Inactive ${0}`}
                tabClassName='text-danger'
              />
            </Tabs>
            <div className='card-body'>
              <div className='row'>
                <div className='col-6'>
                  <input
                    className='form-control'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => searchOnChange(e.target.value)}
                  />
                </div>
                <div className='col-6 text-right'>
                  <button
                    className='btn btn-gradient-success btn-fw'
                    onClick={addOnClick}
                  >
                    <i className='mdi mdi-plus' /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <ComapnyTable data={company} editOnClick={editOnClick} />
            </div>
            {company && company.length > 0 && (
              <div className='m-2 text-right'>
                <Pagination
                  showSizeChanger
                  total={0}
                  defaultCurrent={1}
                  current={currentPage}
                  defaultPageSize={10}
                  pageSize={pageSizeTotal}
                  onChange={pageSizeChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        title={selectedId ? "Edit Company" : "Add Company"}
        width={800}
        footer={null}
        onCancel={closeModalOnClick}
      >
        <div>
          <div className='row form-group'>
            <div className='col-6'>
              <label className='required'>
                Name <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Name'
                value={name}
                onChange={(e) => nameOnChange(e.target.value)}
                style={error["name"] ? { borderColor: "red" } : {}}
              />
            </div>
            <div className='col-6'>
              <label>
                Email <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Email'
                value={email}
                onChange={(e) => emailOnChange(e.target.value)}
                style={error["email"] ? { borderColor: "red" } : {}}
              />
            </div>
            <div className='col-6 mt-3'>
              <label>
                Mobile Number <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Mobile Number'
                value={mobileNumber}
                onChange={(e) => mobileNumberOnChange(e.target.value)}
                style={error["mobileNumber"] ? { borderColor: "red" } : {}}
              />
            </div>
            <div className='col-6 mt-3'>
              <label>GST</label>
              <input
                className='form-control'
                placeholder='GST'
                value={gst}
                onChange={(e) => gstOnChange(e.target.value)}
              />
            </div>
            <div className='col-6 mt-3'>
              <label>
                Contact Person Name <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Contact Person Name'
                value={contactName}
                onChange={(e) => contactNameOnChange(e.target.value)}
                style={error["contactName"] ? { borderColor: "red" } : {}}
              />
            </div>
            <div className='col-6 mt-3'>
              <label>
                Contact Person Mobile Number{" "}
                <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Contact Person Mobile Number'
                value={contactMobileNumber}
                onChange={(e) => contactMobileNumberOnChange(e.target.value)}
                style={
                  error["contactMobileNumber"] ? { borderColor: "red" } : {}
                }
              />
            </div>
            <div className='col-12 mt-3'>
              <label>
                Address <span className='text-danger'>*</span>
              </label>
              <textarea
                className='form-control'
                placeholder='Address'
                value={address}
                onChange={(e) => addressOnChange(e.target.value)}
                style={
                  error["address"]
                    ? { borderColor: "red", height: 100 }
                    : { height: 100 }
                }
              />
            </div>
            <div className='col-6 mt-3'>
              <label>
                Lat <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Lat'
                value={lat}
                onChange={(e) => latOnChange(e.target.value)}
                style={error["lat"] ? { borderColor: "red" } : {}}
              />
            </div>
            <div className='col-6 mt-3'>
              <label>
                Long <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control'
                placeholder='Long'
                value={long}
                onChange={(e) => longOnChange(e.target.value)}
                style={error["long"] ? { borderColor: "red" } : {}}
              />
            </div>
            {selectedId && (
              <div className='col-6 mt-3'>
                <label>Status</label>
                <Select
                  value={status}
                  onChange={statusOnChange}
                  className='form-control'
                >
                  <Option value={"Y"}>Active</Option>
                  <Option value={"N"}>Inactive</Option>
                </Select>
              </div>
            )}
          </div>
          <div className='text-center mt-4'>
            <button
              className='btn btn-gradient-success btn-fw'
              onClick={saveOnClick}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QBankMainCategory;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Select, Modal } from 'antd'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TestMainTable from '../../components/Tables/TestMainTable'

import { actionType } from '../../constants/actionType'
import { getDeliveryPartners } from '../../store/deliverypartner/action'
import DeliveryPartnersRepository from '../../repositories/DeliveryPartnersRepository'

const { Option } = Select

const QBankMainCategory = () => {

    const dispatch = useDispatch();
    const { testMainCat, testMainActiveCatCount, testMainInactiveCatCount } = useSelector(({ testCategory }) => testCategory);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSizeTotal, setPageSizeTotal] = useState(10);
    const [tab, setTab] = useState('Y');
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [checkedIds, setcheckedIds] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getMainData()
    }, [])

    const getMainData = () => {
        let ctr = {
            status: tab
        };
        ctr.start = currentPage === 1 ? 0 : ((currentPage - 1) * pageSizeTotal);
        ctr.limit = pageSizeTotal;
        dispatch(getDeliveryPartners(ctr))
    }

    const tabOnChange = (tab) => {
        setSearch('')
        let ctr = {
            status: tab
        };
        ctr.start = 0;
        ctr.limit = pageSizeTotal;
        dispatch(getDeliveryPartners(ctr))
        setTab(tab)
        setCurrentPage(1)
    }

    const addOnClick = () => {
        setName('')
        setShowModal(true)
    }

    const editOnClick = (obj) => {
        setSelectedId(obj._id)
        setName(obj.name)
        setPosition(obj.position)
        setShowModal(true)
    }

    const closeModalOnClick = () => {
        setSelectedId('')
        setName('')
        setShowModal(false)
    }

    const nameOnChange = (value) => {
        setName(value)
        setErrorMessage('')
    }

    const positionOnChange = (value) => {
        const re = /^[0-9\b]+$/; //rules
        if (value === "" || re.test(value)) {
            setPosition(value)
            setErrorMessage('')
        }
    }

    const saveOnClick = async () => {
        if (name && position) {
            if (selectedId) update()
            if (!selectedId) save()
        } else {
            if (!name) setErrorMessage('Please enter name')
            if (!position) setErrorMessage('Please enter position')
        }
    }

    const save = async () => {
        let result = await DeliveryPartnersRepository.cretae({ name, position })
        if (result && result.data) {
            getMainData()
            closeModalOnClick()
        } else {
            setErrorMessage(result.message)
        }
    }

    const update = async () => {
        let result = await DeliveryPartnersRepository.update(selectedId, { name, position })
        if (result && result.data) {
            getMainData()
            closeModalOnClick()
        } else {
            setErrorMessage(result.message)
        }
    }

    const checkOne = (id) => {
        let array = [...checkedIds]
        let index = array.findIndex(a => a === id)
        if (index >= 0) array.splice(index, 1)
        if (index < 0) array.push(id)
        setcheckedIds(array)
    }

    const checkAll = (check) => {
        let ids = check ? testMainCat.map(q => q._id) : []
        setcheckedIds(ids)
    }

    const pageSizeChange = async (page, pageSize) => {
        let ctr = {
            status: tab
        };
        ctr.start = page === 1 ? 0 : ((page - 1) * pageSize);
        ctr.limit = page * pageSize;
        if (search) ctr.search = search;
        dispatch(getDeliveryPartners(ctr))
        setCurrentPage(page);
        setPageSizeTotal(pageSize);
    }

    const searchOnChange = (search) => {
        let ctr = {
            status: tab
        };
        ctr.start = 0;
        ctr.limit = pageSizeTotal;
        ctr.search = search;
        dispatch(getDeliveryPartners(ctr))
        setSearch(search);
        setCurrentPage(1);
    }

    const actionOnChange = (action) => {
        if (checkedIds.length) {
            Modal.confirm({
                title: 'Confirm',
                content: `Do you want to ${actionType[action]}`,
                okText: 'Yes',
                cancelText: 'No',
                centered: true,
                onOk: () => actionConfirm(action),
            })
        } else {
            Modal.error({
                title: "Please Select One Data",
                centered: true
            })
        }
    }

    const actionConfirm = async (action) => {
        let result
        if (action === "D") {
            result = await DeliveryPartnersRepository.delete({ ids: checkedIds })
        } else {
            result = await DeliveryPartnersRepository.updateStatus({ ids: checkedIds, status: action })
        }
        if (result && result.status === 200) {
            let ctr = {
                status: tab
            };
            ctr.start = currentPage === 1 ? 0 : ((currentPage - 1) * pageSizeTotal);
            ctr.limit = currentPage * pageSizeTotal;
            if (search) ctr.search = search;
            dispatch(getDeliveryPartners(ctr))
            setcheckedIds([])
        }
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-bike menu-icon"></i>
                    </span> Delivery Partner
                </h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card mb-3">
                    <div className="card">
                        <Tabs
                            id="fill-tab-example"
                            className="mb-3" fill
                            activeKey={tab}
                            onSelect={(key) => tabOnChange(key)}
                        >
                            <Tab eventKey="Y" title={`Active ${testMainActiveCatCount}`} tabClassName="text-success" />
                            <Tab eventKey="N" title={`Inactive ${testMainInactiveCatCount}`} tabClassName="text-danger" />
                        </Tabs>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Action"
                                        className="form-control"
                                        onChange={(value) => actionOnChange(value)}
                                        value={null}
                                    >
                                        {tab === "N" && <Option value="Y">Active</Option>}
                                        {tab === "Y" && <Option value="N">Inactive</Option>}
                                        <Option value="D">Delete</Option>
                                    </Select>
                                </div>
                                <div className="col-lg-4">
                                    <input
                                        className="form-control"
                                        placeholder='Search'
                                        value={search}
                                        onChange={(e) => searchOnChange(e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-4 text-right">
                                    <button className="btn btn-gradient-success btn-fw" onClick={addOnClick}>
                                        <i className="mdi mdi-plus" /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <TestMainTable
                                data={testMainCat}
                                editOnClick={editOnClick}
                                checkOne={checkOne}
                                checkAll={checkAll}
                                checkedIds={checkedIds}
                            />
                        </div>
                        {testMainCat.length > 0 &&
                            <div className='m-2 text-right'>
                                <Pagination
                                    showSizeChanger
                                    total={tab === "Y" ? testMainActiveCatCount : testMainInactiveCatCount}
                                    defaultCurrent={1}
                                    current={currentPage}
                                    defaultPageSize={10}
                                    pageSize={pageSizeTotal}
                                    onChange={pageSizeChange}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal
                open={showModal}
                title={selectedId ? "Edit Main Category" : "Add Main Category"}
                width={500}
                centered
                footer={null}
                onCancel={closeModalOnClick}
            >
                <div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => nameOnChange(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder='Position'
                            value={position}
                            onChange={(e) => positionOnChange(e.target.value)}
                        />
                    </div>
                    {errorMessage &&
                        <div className='text-center'>
                            <span className='text-danger'>{errorMessage}</span>
                        </div>
                    }
                    <div className='text-center mt-4'>
                        <button className="btn btn-gradient-success btn-fw" onClick={saveOnClick}>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default QBankMainCategory
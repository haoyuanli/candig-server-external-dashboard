import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Row, Button, Form, FormText, FormGroup, Label, Input,
  Col, Card, CardBody,
} from 'reactstrap';
import {
  searchBeaconFreq, searchBeaconRange, searchVariantSets, getReferenceSet,
} from '../api/api';
import BeaconTable from '../components/Tables/BeaconTable';

import { notify, NotificationAlert } from '../utils/alert';
import { trackPromise } from '../components/LoadingIndicator/LoadingIndicator';

// Consts
import { BeaconFreqTableColumnDefs, BeaconRangeTableColumnDefs, ListOfReferenceNames } from '../constants/constants';

import '../assets/css/VariantsSearch.css';

function BeaconSearch() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [activeColumnDefs, setActiveColumnDefs] = useState([]);
  const [loadingIndicator, setLoadingIndicator] = useState('');
  const [displayBeaconTable, setDisplayBeaconTable] = useState(false);
  // const [variantSet, setVariantSets] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const requestModeFunc = { range: searchBeaconRange, freq: searchBeaconFreq };
  const notifyEl = useRef(null);

  /*
  Fetches reference set Name and sets referenceSetName
  * @param {string}... referenceSetId
  */
  function settingReferenceSetName(referenceSetId) {
    getReferenceSet(referenceSetId).then((data) => {
      setReferenceSetName(data.results.name);
    }).catch(() => {
      setReferenceSetName('Not Available');
    });
  }

  useEffect(() => {
    // Hide BeaconTable when datasetId changes
    setDisplayBeaconTable(false);

    // Check for variant and reference name set on datasetId changes
    trackPromise(
      searchVariantSets(datasetId).then((data) => {
        // setVariantSets(data.results.total);
        settingReferenceSetName(data.results.variantSets[0].referenceSetId);
      }).catch(() => {
        // setVariantSets('Not Available');
        setReferenceSetName('Not Available');
        // notify(
        //   notifyEl,
        //   'No variants or reference set names were found.',
        //   'warning',
        // );
      }),
    );
  }, [datasetId]);

  /*
  Build the dropdown for referenceName
  * @param {None}
  * Return a list of options with referenceNames
  */
  function refNameSelectBuilder() {
    const refNameList = [];

    for (let i = 0; i < ListOfReferenceNames.length; i += 1) {
      refNameList.push(
        <option
          key={ListOfReferenceNames[i]}
          value={ListOfReferenceNames[i]}
        >
          {ListOfReferenceNames[i]}
        </option>,
      );
    }
    return refNameList;
  }

  /*
  Trigger a notification
  * @param {string}... message
  * @param {string}... type
  * Trigger a notification message of selected type
  */
  function notificationHandler(message, type) {
    notify(
      notifyEl,
      message,
      type,
    );
  }

  /*
  Stringify the Allele Freq object to be displayed in ag-grid table.
  * @param {array}... records
  * Return a list of records with stringified Allele Freq object
  */
  function processFreqVariantsResults(records) {
    const processedRecords = records;
    for (let i = 0; i < processedRecords.length; i += 1) {
      processedRecords[i].AF = JSON.stringify(records[i].AF);
    }
    return records;
  }

  /*
  Hide table and throw warning if the search range is > 5000, or if start > end.
  * @param {string}... start
  * @param {string}... end
  * Return false if the range is > 5000, true otherwise.
  */
  function validateForm(start, end) {
    if ((Number(end) - Number(start)) > 5000) {
      notificationHandler('The maximum range you could search for is 5000 bps.', 'warning');
      setDisplayBeaconTable(false);
      return false;
    }

    if (Number(end) < Number(start) + 1) {
      notificationHandler('End cannot be smaller than start.', 'warning');
      setDisplayBeaconTable(false);
      return false;
    }

    return true;
  }

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    const mode = 'freq';
    const start = e.target.start.value - 1;
    const end = e.target.end.value;

    if (validateForm(start, end) === false) {
      return; // prevent the code below from running
    }

    setLoadingIndicator('🕛  Loading...');

    requestModeFunc[mode](datasetId, start, end, e.target.referenceName.value)
      .then((data) => {
        setLoadingIndicator('');
        if (data.results.variants.length !== 0) {
          if (mode === 'freq') {
            setActiveColumnDefs(BeaconFreqTableColumnDefs);
            setRowData(processFreqVariantsResults(data.results.variants));
          } else if (mode === 'range') {
            setActiveColumnDefs(BeaconRangeTableColumnDefs);
            setRowData(data.results.variants);
          }
          setDisplayBeaconTable(true);
        } else {
          setDisplayBeaconTable(false);
          setLoadingIndicator('❌ No variants were found.');
          notificationHandler('No variants were found.', 'warning');
        }
      }).catch(() => {
        setDisplayBeaconTable(false);
        setLoadingIndicator('No variants were found.');
        setRowData([]);
        notificationHandler('No variants were found.', 'warning');
      });
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notifyEl} />
        <Row className="justify-content-md-center" style={{ marginBottom: '30px' }}>
          <Col lg="5" md="5" sm="5">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="3">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-paper text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="9">
                    <div className="numbers">
                      <p className="card-category">Overview</p>
                      {/* {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{variantSet}</CardTitle>
                      )}
                      <p /> */}
                      <p style={{ fontSize: '14px' }}>
                        Release date: Jun.25, 2021.
                        {' '}
                        <br />
                        Samples included: 600.
                      </p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-map-big text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">ReferenceSet</p>
                      {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{referenceSetName}</CardTitle>
                      )}
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Form onSubmit={formHandler} className="justify-content-center">
          <Row style={{ justifyContent: 'center' }}>
            <FormGroup>
              <Label>Reference Genome</Label>
              <Input required type="select" disabled>
                <option>{referenceSetName}</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="referenceName">Chromosome</Label>
              <Input required type="select" id="referenceName">{ refNameSelectBuilder() }</Input>
            </FormGroup>

            <FormGroup>
              <Label for="start" style={{ float: 'left' }}>Start</Label>
              <Input required type="number" id="start" min="1" />
              <FormText className="text-muted">
                Min value is 1.
              </FormText>
            </FormGroup>

            <FormGroup>
              <Label for="end">End</Label>
              <Input required type="number" id="end" min="1" />
              <FormText className="text-muted">
                Cannot be smaller than start.
              </FormText>
            </FormGroup>
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            {/* <FormGroup>
              <Label for="requestMode">Mode</Label>
              <Input required type="select" id="requestMode" disabled>
                {
                    [
                      <option key="freq" value="freq">Allele Frequency Search</option>,
                    ]
                  }
              </Input>
            </FormGroup> */}

            <Button color="info" style={{ marginTop: '30px' }}>Search</Button>
          </Row>

        </Form>

        <Row style={{ marginTop: '20px' }}>
          <div className="ml-auto mr-auto">
            {loadingIndicator}
          </div>
        </Row>

        {displayBeaconTable ? <BeaconTable columnDefs={activeColumnDefs} rowData={rowData} datasetId={datasetId} /> : null }

      </div>
    </>
  );
}

export default BeaconSearch;

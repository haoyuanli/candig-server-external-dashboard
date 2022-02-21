import React from 'react';

// reactstrap components
import { Card, CardBody } from 'reactstrap';

/*
 * Help component
 */
function Help() {
  return (
    <>
      <div className="content">

        <div className="card-columns">
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">FAQ</h5>
              <h6 className="card-subtitle mb-2 text-muted">This is a demo with limited-features.</h6>
              <p className="card-text">
                Our apologies, but this demo is of limited feature, and some functionalities will not work.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">How do I view different datasets?</h6>
              <p className="card-text">
                You may change the selected dataset from the dropdown in the top-right corner.
              </p>
              {/* <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a> */}
            </CardBody>
          </Card>

        </div>

      </div>
    </>
  );
}

export default Help;

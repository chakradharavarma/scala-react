import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import MonthlyUsagePanel from './MonthlyUsagePanel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const data = [
  {
    "has_result": false,
    "uuid": "334321e7-b642-4b0a-b372-a6784014fc93",
    "name": "Workflow: multi step near xxx",
    "use_s3_secure_redirect": true,
    "id": 1465,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/334321e7-b642-4b0a-b372-a6784014fc93",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-08 11:36:00",
    "updated": "2018-08-08 12:30:00",
    "status": "COMPLETED",
    "running_time": "00:48:15",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "58bfe784-8fb6-4bc3-9bc3-372242a06ca7",
    "name": "Workflow: basic workflow test",
    "use_s3_secure_redirect": true,
    "id": 1466,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/58bfe784-8fb6-4bc3-9bc3-372242a06ca7",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-08 11:47:13",
    "updated": "2018-08-08 11:52:53",
    "status": "COMPLETED",
    "running_time": "00:02:30",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "89622f91-e8c1-4aa1-8abb-fc96f27fbb23",
    "name": "Workflow: andre test",
    "use_s3_secure_redirect": true,
    "id": 1463,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/89622f91-e8c1-4aa1-8abb-fc96f27fbb23",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-08 11:20:10",
    "updated": "2018-08-08 11:21:43",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "87bc8368-cf46-46c7-a139-da1090ab307d",
    "name": "Workflow: Multi-Step NCAR 43",
    "use_s3_secure_redirect": true,
    "id": 1464,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/87bc8368-cf46-46c7-a139-da1090ab307d",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-08 11:20:26",
    "updated": "2018-08-08 11:21:40",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "7fc3c69c-7ae7-417c-aa82-5cf935817bc3",
    "name": "Workflow: Basic Workflow 1",
    "use_s3_secure_redirect": true,
    "id": 1462,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/7fc3c69c-7ae7-417c-aa82-5cf935817bc3",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-07 12:18:55",
    "updated": "2018-08-07 13:12:50",
    "status": "COMPLETED",
    "running_time": "00:02:00",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "d3ca6946-b1a8-4ce2-95b3-eab63c5de123",
    "name": "Workflow: Multi-Step NCAR 50",
    "use_s3_secure_redirect": true,
    "id": 1461,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/d3ca6946-b1a8-4ce2-95b3-eab63c5de123",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-07 12:15:16",
    "updated": "2018-08-07 13:12:50",
    "status": "COMPLETED",
    "running_time": "00:46:41",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "ead2d3ee-9f31-4ef0-a66f-d27241bbf9ee",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1460,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/ead2d3ee-9f31-4ef0-a66f-d27241bbf9ee",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-07 06:00:57",
    "updated": "2018-08-07 08:19:19",
    "status": "COMPLETED",
    "running_time": "00:43:11",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "92b8c3cf-1a4d-4e0f-bf00-471527d2e98c",
    "name": "Workflow: SUNY WRF Workflow",
    "use_s3_secure_redirect": true,
    "id": 1459,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/92b8c3cf-1a4d-4e0f-bf00-471527d2e98c",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-06 13:57:02",
    "updated": "2018-08-06 15:24:01",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "7c38d795-936c-4353-8e64-b8938e8bc0c6",
    "name": "Workflow: SUNY WRF Workflow",
    "use_s3_secure_redirect": true,
    "id": 1458,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/7c38d795-936c-4353-8e64-b8938e8bc0c6",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-06 13:40:51",
    "updated": "2018-08-06 13:48:13",
    "status": "COMPLETED",
    "running_time": "00:02:00",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "3d883c74-ed74-4726-a87a-fc44e252e47c",
    "name": "Workflow: SUNY WRF Workflow",
    "use_s3_secure_redirect": true,
    "id": 1457,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/3d883c74-ed74-4726-a87a-fc44e252e47c",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-06 13:25:41",
    "updated": "2018-08-06 13:33:38",
    "status": "COMPLETED",
    "running_time": "00:03:31",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "5fa1b581-c993-408c-bc57-b72c7660dc91",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1456,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/5fa1b581-c993-408c-bc57-b72c7660dc91",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-06 06:01:03",
    "updated": "2018-08-06 10:40:04",
    "status": "COMPLETED",
    "running_time": "00:45:41",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "da8062d6-2766-43e0-ac28-74b785cbdc78",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1455,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/da8062d6-2766-43e0-ac28-74b785cbdc78",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-05 06:00:58",
    "updated": "2018-08-06 10:40:04",
    "status": "COMPLETED",
    "running_time": "00:44:41",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "5c7eb785-0b62-4769-8cd1-0797ca87a456",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1454,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/5c7eb785-0b62-4769-8cd1-0797ca87a456",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-04 06:00:54",
    "updated": "2018-08-06 10:40:04",
    "status": "COMPLETED",
    "running_time": "00:45:40",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "b5a51b2d-29fa-486d-9b7c-b0038c050ba2",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1453,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/b5a51b2d-29fa-486d-9b7c-b0038c050ba2",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-03 06:00:58",
    "updated": "2018-08-06 10:40:04",
    "status": "COMPLETED",
    "running_time": "00:44:41",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "8aa46fae-6d94-4a00-aeac-acfb667afca4",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1452,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/8aa46fae-6d94-4a00-aeac-acfb667afca4",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-02 06:00:45",
    "updated": "2018-08-02 10:36:01",
    "status": "COMPLETED",
    "running_time": "00:45:10",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "32d08abf-5b9e-403d-8a6b-ea0735681984",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1451,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/32d08abf-5b9e-403d-8a6b-ea0735681984",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-01 11:03:53",
    "updated": "2018-08-01 17:16:40",
    "status": "COMPLETED",
    "running_time": "00:45:40",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "11ac2ed6-1b6f-43a3-bbdc-f74cb2a95398",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1450,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/11ac2ed6-1b6f-43a3-bbdc-f74cb2a95398",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-01 10:09:34",
    "updated": "2018-08-01 11:02:46",
    "status": "COMPLETED",
    "running_time": "00:45:11",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "fc154d0b-09e3-4890-aa09-a2312b4adab4",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1449,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/fc154d0b-09e3-4890-aa09-a2312b4adab4",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-01 09:59:14",
    "updated": "2018-08-01 10:09:17",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "1ffe735f-ceb2-4e05-b623-f8c8d958a796",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1448,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/1ffe735f-ceb2-4e05-b623-f8c8d958a796",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-01 09:40:06",
    "updated": "2018-08-01 09:59:11",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": false,
    "uuid": "07512f5d-533b-4962-a3f0-375bca9f07fa",
    "name": "Workflow: Multi-Step NCAR",
    "use_s3_secure_redirect": true,
    "id": 1447,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/07512f5d-533b-4962-a3f0-375bca9f07fa",
    "result_link": null,
    "user": "scala",
    "created": "2018-08-01 09:33:05",
    "updated": "2018-08-01 09:40:07",
    "status": "TERMINATED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": ""
  },
  {
    "has_result": true,
    "uuid": "39ac4aa2-4e06-4206-ba93-94511943d29f",
    "name": "Preset: new preset",
    "use_s3_secure_redirect": true,
    "id": 568,
    "ganglia_url": "s3://sccp-dev-scala-bucket/scala/ganglia-graphs/39ac4aa2-4e06-4206-ba93-94511943d29f",
    "result_link": "/downloadresult/39ac4aa2-4e06-4206-ba93-94511943d29f",
    "user": "scala",
    "created": "2018-02-13 12:37:03",
    "updated": "2018-02-13 12:51:32",
    "status": "COMPLETED",
    "running_time": "N/A",
    "cancellable": false,
    "result_size": "257 bytes"
  }
];

const groups = data.reduce(function (r, o) {
  var m = o.updated.split(('-'))[1];
  (r[m]) ? r[m].data.push(o) : r[m] = { group: m, data: [o] };
  return r;
}, {});

const results = Object.keys(groups).map(function (k) { return groups[k]; });


export default class Usage extends Component {

  render() {
    return (
      <Card className='usage-root'>
        <div className='usage-summary'>
          <Typography color='secondary' variant='headline'>
            Summary
          </Typography>
          <Divider />
        </div>
        <div className='summary-container'>
          {
            results.map((result, i) => <MonthlyUsagePanel key={`monthly-usage-panel-${i}`} usage={result} />)
          }
        </div>

      </Card>
    );
  }
}

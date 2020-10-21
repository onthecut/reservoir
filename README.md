# Reservoir

> Reservoir sourced by CRT Open Data, CRT Notices and OpenStreetMap. Providing a stream of clean and nutrient data APIs.

## API

Reservoir aims to serve up conent in the most useful formats for both application and mapping systems.

### Waterways

Waterways include both canals and rivers in the United Kingdom known to be navigable.

#### List Waterways

```
GET /v1/waterways
```

```json
[
  {
    "id": "GU",
    "name": "Grand Union Canal",
    "colour": "#123123"
  }
]
```

### Notices

Notices are published by the Canal and River Trust to update users on current and upcoming closures, work and other information relating to various parts of their network. These are available from Canal and River Trust's own website at https://canalrivertrust.org.uk/.

#### List Notices

```
GET /v1/notices
```

```json
[
  {
    "id": "1234",
    "name": "Cowley Services Maintenance",
    "fromDate": "",
    "endDate": null
  }
]
```

### Datasets

##

## Development

### Tasks

#### start

#### dev

#### update-notices

#### update-open-data

import pandas
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


congestionDFColumns = ['Source', 'Destination', 'Day', 'Response']
congestionDF = pandas.DataFrame(columns=congestionDFColumns)

##casa to sjsu
id_3 = [
    [
        # Monday
        {"value": 9.53, "label": "00"}, {"value": 10.36, "label": "01"}, {"value": 10.01, "label": "02"},
        {"value": 9.89, "label": "03"}, {"value": 10.09, "label": "04"}, {"value": 9.72, "label": "05"},
        {"value": 9.76, "label": "06"}, {"value": 30.33, "label": "07"}, {"value": 60.37, "label": "08"},
        {"value": 60.14, "label": "09"}, {"value": 29.37, "label": "10"}, {"value": 35.09, "label": "11"},
        {"value": 35.34, "label": "12"}, {"value": 35.4, "label": "13"}, {"value": 34.0, "label": "14"},
        {"value": 34.03, "label": "15"}, {"value": 29.38, "label": "16"}, {"value": 68.71, "label": "17"},
        {"value": 28.95, "label": "18"}, {"value": 29.58, "label": "19"}, {"value": 30.06, "label": "20"},
        {"value": 29.61, "label": "21"}, {"value": 29.82, "label": "22"}, {"value": 29.47, "label": "23"}
    ]
    , [  # Tuesday
        {"value": 10.13, "label": "00"}, {"value": 10.42, "label": "01"}, {"value": 9.66, "label": "02"},
        {"value": 9.41, "label": "03"}, {"value": 10.61, "label": "04"}, {"value": 9.78, "label": "05"},
        {"value": 10.78, "label": "06"}, {"value": 30.09, "label": "07"}, {"value": 59.84, "label": "08"},
        {"value": 60.46, "label": "09"}, {"value": 30.71, "label": "10"}, {"value": 34.73, "label": "11"},
        {"value": 35.46, "label": "12"}, {"value": 34.34, "label": "13"}, {"value": 34.1, "label": "14"},
        {"value": 34.89, "label": "15"}, {"value": 29.37, "label": "16"}, {"value": 67.87, "label": "17"},
        {"value": 29.0, "label": "18"}, {"value": 29.99, "label": "19"}, {"value": 29.81, "label": "20"},
        {"value": 29.48, "label": "21"}, {"value": 30.46, "label": "22"}, {"value": 29.72, "label": "23"}
    ],
    [
        # Wednesday
        {"value": 9.46, "label": "00"}, {"value": 10.58, "label": "01"}, {"value": 9.7, "label": "02"},
        {"value": 9.88, "label": "03"}, {"value": 10.04, "label": "04"}, {"value": 9.98, "label": "05"},
        {"value": 9.58, "label": "06"}, {"value": 29.75, "label": "07"}, {"value": 59.65, "label": "08"},
        {"value": 61.04, "label": "09"}, {"value": 29.79, "label": "10"}, {"value": 34.69, "label": "11"},
        {"value": 34.61, "label": "12"}, {"value": 34.81, "label": "13"}, {"value": 35.44, "label": "14"},
        {"value": 36.0, "label": "15"}, {"value": 30.58, "label": "16"}, {"value": 69.87, "label": "17"},
        {"value": 29.69, "label": "18"}, {"value": 30.06, "label": "19"}, {"value": 29.22, "label": "20"},
        {"value": 30.05, "label": "21"}, {"value": 30.26, "label": "22"}, {"value": 29.69, "label": "23"}
    ],
    [
        # Thursday
        {"value": 9.09, "label": "00"}, {"value": 8.92, "label": "01"}, {"value": 9.43, "label": "02"},
        {"value": 9.83, "label": "03"}, {"value": 9.59, "label": "04"}, {"value": 11.08, "label": "05"},
        {"value": 10.38, "label": "06"}, {"value": 29.89, "label": "07"}, {"value": 60.18, "label": "08"},
        {"value": 60.53, "label": "09"}, {"value": 29.61, "label": "10"}, {"value": 33.53, "label": "11"},
        {"value": 35.0, "label": "12"}, {"value": 34.99, "label": "13"}, {"value": 34.98, "label": "14"},
        {"value": 35.61, "label": "15"}, {"value": 29.78, "label": "16"}, {"value": 70.1, "label": "17"},
        {"value": 29.48, "label": "18"}, {"value": 30.28, "label": "19"}, {"value": 29.64, "label": "20"},
        {"value": 29.15, "label": "21"}, {"value": 29.48, "label": "22"}, {"value": 29.71, "label": "23"}
    ],
    [
        # Friday
        {"value": 9.97, "label": "00"}, {"value": 10.64, "label": "01"}, {"value": 10.03, "label": "02"},
        {"value": 10.06, "label": "03"}, {"value": 9.79, "label": "04"}, {"value": 9.86, "label": "05"},
        {"value": 9.65, "label": "06"}, {"value": 29.07, "label": "07"}, {"value": 60.48, "label": "08"},
        {"value": 61.02, "label": "09"}, {"value": 30.02, "label": "10"}, {"value": 34.87, "label": "11"},
        {"value": 35.43, "label": "12"}, {"value": 33.72, "label": "13"}, {"value": 34.69, "label": "14"},
        {"value": 35.6, "label": "15"}, {"value": 29.44, "label": "16"}, {"value": 68.39, "label": "17"},
        {"value": 29.44, "label": "18"}, {"value": 30.59, "label": "19"}, {"value": 29.67, "label": "20"},
        {"value": 29.93, "label": "21"}, {"value": 30.16, "label": "22"}, {"value": 30.15, "label": "23"}
    ],
    [
        # Saturday
        {"value": 9.5, "label": "00"}, {"value": 10.67, "label": "01"}, {"value": 9.88, "label": "02"},
        {"value": 9.92, "label": "03"}, {"value": 9.75, "label": "04"}, {"value": 8.74, "label": "05"},
        {"value": 9.86, "label": "06"}, {"value": 29.78, "label": "07"}, {"value": 61.09, "label": "08"},
        {"value": 60.77, "label": "09"}, {"value": 30.24, "label": "10"}, {"value": 34.37, "label": "11"},
        {"value": 35.15, "label": "12"}, {"value": 35.18, "label": "13"}, {"value": 34.38, "label": "14"},
        {"value": 34.52, "label": "15"}, {"value": 29.76, "label": "16"}, {"value": 68.64, "label": "17"},
        {"value": 29.87, "label": "18"}, {"value": 29.29, "label": "19"}, {"value": 29.85, "label": "20"},
        {"value": 30.11, "label": "21"}, {"value": 30.18, "label": "22"}, {"value": 29.93, "label": "23"}
    ]
]

# Alum Rock to SJSU

id_2 = [
    [
        {"value": 9.9, "label": "00"}, {"value": 9.87, "label": "01"}, {"value": 10.27, "label": "02"},
        {"value": 10.15, "label": "03"}, {"value": 9.98, "label": "04"}, {"value": 9.84, "label": "05"},
        {"value": 9.5, "label": "06"}, {"value": 29.32, "label": "07"}, {"value": 71.13, "label": "08"},
        {"value": 71.47, "label": "09"}, {"value": 29.25, "label": "10"}, {"value": 34.54, "label": "11"},
        {"value": 34.59, "label": "12"}, {"value": 34.51, "label": "13"}, {"value": 35.33, "label": "14"},
        {"value": 34.62, "label": "15"}, {"value": 29.35, "label": "16"}, {"value": 57.84, "label": "17"},
        {"value": 29.14, "label": "18"}, {"value": 29.85, "label": "19"}, {"value": 29.86, "label": "20"},
        {"value": 29.71, "label": "21"}, {"value": 29.6, "label": "22"}, {"value": 30.45, "label": "23"}
    ],
    [
        {"value": 9.73, "label": "00"}, {"value": 9.71, "label": "01"}, {"value": 9.35, "label": "02"},
        {"value": 10.28, "label": "03"}, {"value": 10.71, "label": "04"}, {"value": 9.57, "label": "05"},
        {"value": 9.36, "label": "06"}, {"value": 29.34, "label": "07"}, {"value": 71.2, "label": "08"},
        {"value": 72.14, "label": "09"}, {"value": 30.28, "label": "10"}, {"value": 34.67, "label": "11"},
        {"value": 34.9, "label": "12"}, {"value": 34.2, "label": "13"}, {"value": 34.52, "label": "14"},
        {"value": 34.66, "label": "15"}, {"value": 29.85, "label": "16"}, {"value": 57.89, "label": "17"},
        {"value": 29.54, "label": "18"}, {"value": 30.33, "label": "19"}, {"value": 29.9, "label": "20"},
        {"value": 30.37, "label": "21"}, {"value": 29.11, "label": "22"}, {"value": 28.97, "label": "23"}
    ]
]

for i in range(0, len(days)):
    y = pandas.Series(data=['Casa Verde Street', 'San Jose State University', days[i], id_3[i]],
                      index=congestionDFColumns)
    # x=pandas.DataFrame(data=['Casa Verde Street','San Jose State University',days[i],id_3[i]],columns=cols)
    congestionDF = congestionDF.append(y, ignore_index=True)

for i in range(0, 2):
    y = pandas.Series(data=['Alum Rock Park', 'San Jose State University', days[i], id_2[i]],
                      index=congestionDFColumns)
    congestionDF = congestionDF.append(y, ignore_index=True)
    if(congestionDF.shape[0]!=0):
        print "Congestion24hour cache initialized"

##1: Casa Verde Street to Airport
##2: Alum rock to SJSU
##3: Casa Verde Street to SJSU
##4 : sjsu to casa verde street
##5: airpirt to scasa verde

##22 sjsu to alum rock
##23 casa to costco

import pandas



singleCongestionDFColumns=['Source','Destination','Day','Time','Response']
id_2 = [
    {
        "Source": "Alum Rock Park",
        "Destination":"San Jose State University",
        "Day": "Monday", "Time": "09:00:00",
        "Response": [{"CongestionRate": "74.5%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "76.33%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "50.83%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "75.67%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "51.17%", "StreetName": "I-680 S"},
                     {"CongestionRate": "74.0%", "StreetName": "I-280 N"},
                     {"CongestionRate": "74.67%", "StreetName": "N 7th St"}]
    },
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Monday", "Time": "10:00:00",
        "Response": [{"CongestionRate": "29.83%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "29.0%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "26.17%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "28.67%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "30.17%", "StreetName": "I-680 S"},
                     {"CongestionRate": "28.5%", "StreetName": "I-280 N"},
                     {"CongestionRate": "27.33%", "StreetName": "N 7th St"}]
    },

    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Monday", "Time": "16:00:00",
        "Response": [{"CongestionRate": "29.0%", "StreetName": "Alum Rock Falls Rd"},
                      {"CongestionRate": "31.0%", "StreetName": "Penitencia Creek Rd"},
                      {"CongestionRate": "31.67%", "StreetName": "Toyon Av"},
                      {"CongestionRate": "32.17%", "StreetName": "McKee Rd"},
                      {"CongestionRate": "30.83%", "StreetName": "I-680 S"},
                      {"CongestionRate": "27.0%", "StreetName": "I-280 N"},
                      {"CongestionRate": "27.17%", "StreetName": "N 7th St"}]
    },
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Tuesday", "Time": "03:00:00",
        "Response": [{"CongestionRate": "10.0%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "11.33%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "9.0%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "10.17%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "10.83%", "StreetName": "I-680 S"},
                     {"CongestionRate": "11.33%", "StreetName": "I-280 N"},
                     {"CongestionRate": "9.83%", "StreetName": "N 7th St"}]
    }
    ,
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Tuesday", "Time": "07:00:00",
        "Response": [{"CongestionRate": "30.83%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "29.83%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "28.67%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "31.5%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "27.17%", "StreetName": "I-680 S"},
                     {"CongestionRate": "27.17%", "StreetName": "I-280 N"},
                     {"CongestionRate": "30.33%", "StreetName": "N 7th St"}]
    }
    ,
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Tuesday", "Time": "11:00:00",
        "Response": [{"CongestionRate": "35.17%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "31.67%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "32.17%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "32.83%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "36.33%", "StreetName": "I-680 S"},
                     {"CongestionRate": "39.67%", "StreetName": "I-280 N"},
                     {"CongestionRate": "39.5%", "StreetName": "N 7th St"}]
    },
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Tuesday", "Time": "15:00:00",
        "Response": [{"CongestionRate": "35.17%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "32.0%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "35.5%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "35.17%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "33.67%", "StreetName": "I-680 S"},
                     {"CongestionRate": "33.5%", "StreetName": "I-280 N"},
                     {"CongestionRate": "33.67%", "StreetName": "N 7th St"}]
    },
    {
        "Source": "Alum Rock Park",
        "Destination": "San Jose State University",
        "Day": "Tuesday", "Time": "20:00:00",
        "Response": [{"CongestionRate": "29.67%", "StreetName": "Alum Rock Falls Rd"},
                     {"CongestionRate": "27.5%", "StreetName": "Penitencia Creek Rd"},
                     {"CongestionRate": "27.67%", "StreetName": "Toyon Av"},
                     {"CongestionRate": "27.17%", "StreetName": "McKee Rd"},
                     {"CongestionRate": "31.33%", "StreetName": "I-680 S"},
                     {"CongestionRate": "29.67%", "StreetName": "I-280 N"},
                     {"CongestionRate": "34.67%", "StreetName": "N 7th St"}]
    }
]


##Casa Verde Street to SJSU:

id_3=[
    {
        "Source": "Casa Verde Street",
        "Destination": "San Jose State University",
        "Day": "Wednesday", "Time": "07:00:00",
        "Response": [{"CongestionRate": "30.33%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "31.83%", "StreetName": "Baypointe Pkwy"},
                     {"CongestionRate": "28.67%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "31.83%", "StreetName": "CA-237 E"},
                     {"CongestionRate": "31.17%", "StreetName": "I-880 S"},
                     {"CongestionRate": "29.0%", "StreetName": "US-101 N"},
                     {"CongestionRate": "28.5%", "StreetName": "N 10th St"}]
    },
    {
        "Source": "Casa Verde Street",
        "Destination": "San Jose State University",
        "Day": "Wednesday", "Time": "10:00:00",
        "Response": [{"CongestionRate": "29.5%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "29.67%", "StreetName": "Baypointe Pkwy"},
                     {"CongestionRate": "25.83%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "30.0%", "StreetName": "CA-237 E"},
                     {"CongestionRate": "29.0%", "StreetName": "I-880 S"},
                     {"CongestionRate": "28.17%", "StreetName": "US 101 N"},
                     {"CongestionRate": "29.0%", "StreetName": "N 10th St"}]

    },
    {
        "Source": "Casa Verde Street",
        "Destination": "San Jose State University",
        "Day": "Wednesday", "Time": "13:00:00",
        "Response": [{"CongestionRate": "32.0%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "37.0%", "StreetName": "Baypointe Pkwy"},
                     {"CongestionRate": "33.17%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "38.67%", "StreetName": "CA-237 E"},
                     {"CongestionRate": "32.0%", "StreetName": "I-880 S"},
                     {"CongestionRate": "35.5%", "StreetName": "US 101 N"},
                     {"CongestionRate": "32.5%", "StreetName": "N 10th St"}]
    },
    {
        "Source": "Casa Verde Street",
        "Destination": "San Jose State University",
        "Day": "Wednesday", "Time": "17:00:00",
        "Response":[{"CongestionRate": "55.5%", "StreetName": "Casa Verde St"},
         {"CongestionRate": "70.17%", "StreetName": "Baypointe Pkwy"},
         {"CongestionRate": "55.5%", "StreetName": "Zanker Rd"},
         {"CongestionRate": "76.5%", "StreetName": "CA-237 E"}, {"CongestionRate": "76.67%", "StreetName": "I-880 S"},
         {"CongestionRate": "56.67%", "StreetName": "US 101 N"},
         {"CongestionRate": "76.83%", "StreetName": "N 10th St"}]
    },
    {
        "Source": "Casa Verde Street",
        "Destination": "San Jose State University",
        "Day": "Wednesday", "Time": "23:00:00",
        "Response": [{"CongestionRate": "29.0%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "25.5%", "StreetName": "Baypointe Pkwy"},
                     {"CongestionRate": "28.33%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "34.17%", "StreetName": "CA-237 E"},
                     {"CongestionRate": "27.5%", "StreetName": "I-880 S"},
                     {"CongestionRate": "29.83%", "StreetName": "US-101 N"},
                     {"CongestionRate": "30.67%", "StreetName": "N 10th St"}]

    },

]

id_4 = [
    {
        "Destination": "Casa Verde Street",
        "Source": "San Jose State University",
        "Day": "Friday", "Time": "00:00:00",
        "Response": [{"CongestionRate": "8.83%", "StreetName": "S 10th St"},
                     {"CongestionRate": "7.83%", "StreetName": "I-280 N"},
                     {"CongestionRate": "8.83%", "StreetName": "CA-87 N"},
                     {"CongestionRate": "12.33%", "StreetName": "N 1st St"},
                     {"CongestionRate": "13.0%", "StreetName": "Charcot Av"},
                     {"CongestionRate": "8.33%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "6.5%", "StreetName": "E Tasman Dr"},
                     {"CongestionRate": "6.0%", "StreetName": "Casa Verde St"}]
    },
    {
        "Destination": "Casa Verde Street",
        "Source": "San Jose State University",
        "Day": "Friday", "Time": "20:00:00",
        "Response": [{"CongestionRate": "25.83%", "StreetName": "S 10th St"},
                     {"CongestionRate": "30.67%", "StreetName": "I-280 N"},
                     {"CongestionRate": "28.67%", "StreetName": "CA-87 N"},
                     {"CongestionRate": "31.33%", "StreetName": "N 1st St"},
                     {"CongestionRate": "29.83%", "StreetName": "Charcot Av"},
                     {"CongestionRate": "29.33%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "33.33%", "StreetName": "E Tasman Dr"},
                     {"CongestionRate": "28.67%", "StreetName": "Casa Verde St"}]
    },
    {
        "Destination": "Casa Verde Street",
        "Source": "San Jose State University",
        "Day": "Friday", "Time": "23:00:00",
        "Response": [{"CongestionRate": "29.0%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "25.5%", "StreetName": "Baypointe Pkwy"},
                     {"CongestionRate": "28.33%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "34.17%", "StreetName": "CA-237 E"},
                     {"CongestionRate": "27.5%", "StreetName": "I-880 S"},
                     {"CongestionRate": "29.83%", "StreetName": "US 101 N"},
                     {"CongestionRate": "30.67%", "StreetName": "N 10th St"}]

    },
    {
        "Destination": "Casa Verde Street",
        "Source": "San Jose State University",
        "Day": "Friday", "Time": "15:00:00",
        "Response": [{"CongestionRate": "35.5%", "StreetName": "S 10th St"},
                     {"CongestionRate": "37.5%", "StreetName": "I-280 N"},
                     {"CongestionRate": "32.17%", "StreetName": "CA-87 N"},
                     {"CongestionRate": "33.5%", "StreetName": "N 1st St"},
                     {"CongestionRate": "34.5%", "StreetName": "Charcot Av"},
                     {"CongestionRate": "32.17%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "31.83%", "StreetName": "E Tasman Dr"},
                     {"CongestionRate": "35.0%", "StreetName": "Casa Verde St"}]
    },

    {
        "Destination": "Casa Verde Street",
        "Source": "San Jose State University",
        "Day": "Friday", "Time": "21:00:00",
        "Response": [{"CongestionRate": "35.5%", "StreetName": "S 10th St"},
                     {"CongestionRate": "37.5%", "StreetName": "I-280 N"},
                     {"CongestionRate": "32.17%", "StreetName": "CA-87 N"},
                     {"CongestionRate": "33.5%", "StreetName": "N 1st St"},
                     {"CongestionRate": "34.5%", "StreetName": "Charcot Av"},
                     {"CongestionRate": "32.17%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "31.83%", "StreetName": "E Tasman Dr"},
                     {"CongestionRate": "35.0%", "StreetName": "Casa Verde St"}]
    },



]


id_1=[
    {
        "Source": "Casa Verde Street",
        "Destination": "Mineta San Jose International Airport",
        "Day": "Tuesday", "Time": "03:00:00",
        "Response": [{"CongestionRate": "7.5%", "StreetName": "Casa Verde St"},
                     {"CongestionRate": "12.0%", "StreetName": "Zanker Rd"},
                     {"CongestionRate": "12.83%", "StreetName": "River Oaks Pkwy"},
                     {"CongestionRate": "9.5%", "StreetName": "N 1st St"},
                     {"CongestionRate": "10.33%", "StreetName": "CA-87 S"},
                     {"CongestionRate": "14.83%", "StreetName": "Skyport Dr"}]

    },
    {
        "Source": "Casa Verde Street",
        "Destination": "Mineta San Jose International Airport",
        "Day": "Monday", "Time": "00:00:00",
        "Response": [{'CongestionRate': '8.33%', 'StreetName': u'Casa Verde St'},
                     {'CongestionRate': '10.33%', 'StreetName': u'Zanker Rd'},
                     {'CongestionRate': '10.17%', 'StreetName': u'River Oaks Pkwy'},
                     {'CongestionRate': '6.0%', 'StreetName': u'N 1st St'},
                     {'CongestionRate': '8.5%', 'StreetName': u'CA-87 S'},
                     {'CongestionRate': '9.5%', 'StreetName': u'Skyport Dr'}]

    }
]

id_5 = [
    {
    "Source": "Mineta San Jose International Airport",
    "Destination": "Casa Verde Street",
    "Day": "Friday", "Time": "20:00:00",
    "Response": [{'CongestionRate': '26.5%', 'StreetName': u'E Brokaw Rd'}, {'CongestionRate': '31.17%', 'StreetName': u'Zanker Rd'}, {'CongestionRate': '33.33%', 'StreetName': u'E Tasman Dr'}, {'CongestionRate': '28.67%', 'StreetName': u' Casa Verde St'}]
}
]

# Friday 20
# id_11=[{'CongestionRate': '29.67%', 'StreetName': u'W St James St'}, {'CongestionRate': '33.5%', 'StreetName': u'N 7th St'}, {'CongestionRate': '29.0%', 'StreetName': u'E San Fernando St'}]


finalData=id_2+id_3+id_4+id_1+id_5
routeCongestionDF=pandas.DataFrame(data=finalData,columns=singleCongestionDFColumns)







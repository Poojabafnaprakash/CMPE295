import json
from pyspark.sql.types import DateType
import pandas
import datetime
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
import pyspark
from pyspark.sql import *
from pyspark import SparkContext
import sys

jsonBody={"Summary":
              [
                  {"Start":"1302 The Alameda, San Jose, CA 95126, USA"},
                  {"End":"1 Washington Sq, San Jose, CA 95192, USA"},
                  {"Time": "10:00:00"},
                  {"Start Time":"10:00:00"},
                  {"Day":"Tuesday"}],
    "steps":
        [
            {"Street Name":"W Julian St",  ### exisits
             "Direction":"East",
             "distanceCovered":"75 ft",
             "timeTaken":"1 min",
             "Time": "10:00:00",
             },
            {
                "Street Name":"W Julian St", ## Exists
                "Direction":"East",
                "distanceCovered":"0.9 mi",
                "timeTaken":"4 mins",
                "Time": "10:00:00"
            },
            {"Street Name":"W St James St",
             "Time": "10:00:00",
             "Direction":"East",
             "distanceCovered":"0.7 mi",
             "timeTaken":"4 mins"
             },
            {"Street Name":"N 7th St","Direction":"South","distanceCovered":"0.4 mi","timeTaken":"2 mins","Time": "10:00:00"}, ##Not there
            {"Street Name":"E San Fernando St","Direction":"East","distanceCovered":"7 ft","timeTaken":"1 min","Time": "10:00:00"}]}



# jsonBody = {
#     "Summary": {
#         "Start": "3700 Casa Verde Street",
#         "End": "San Jose State University",
#         "Time": "30 mins",
#         "Start Time": "10:00:00"
#     },
#     "steps": [
#         {
#             "Street Name": "E Tasman Dr",
#             "Direction": "West",
#             "Time": "10:00:00",
#             "Distance Covered": "2.4 mi",
#             "Time taken": "3 mins"
#         },
#         {
#             "Street Name": "N 1st Street",
#             "Direction": "South",
#             "Distance Covered": "4 mi",
#             "Time taken": "10 mins",
#             "Time": "10:00:00"
#
#         },
#         {
#             "Street Name": "CA 87 S",
#             "Direction": "South",
#             "Time": "10:00:00",
#             "Distance Covered": "7 mi",
#             "Time taken": "10 mins"
#         }
#     ]
# }

def Prediction(jsonBody):
    steps=jsonBody["steps"]
    Summary=jsonBody["Summary"]
    startTime=Summary[2]["Time"]
    day=Summary[4]["Day"]
    respObj={}
    print startTime
    print day
    jsonResponse=[]
    print len(steps)
    sc = SparkContext()
    sqlContext = SQLContext(sc)
    df = sc.wholeTextFiles('/anusha/test.json').flatMap(lambda x: json.loads(x[1]))
    df = sqlContext.createDataFrame(df)
    df = df.withColumn('Date', df['Date'].cast(DateType()))
    df.printSchema()
    df.take(2)
    for i in steps:
        print "Getting information:",i["Street Name"].lower(),i["Time"],i["Direction"]
        print type(i["Street Name"])
        jsonIndex=i["Street Name"]
        print jsonIndex
        df_new = df.filter((df["Street Name"] == i["Street Name"].lower()) & (df["Time"] == startTime) & (df["Directions"]== i["Direction"].strip()) & (df["Day"] == day.strip()))
        ####df_new = df.filter((df["Street Name"] == i["Street Name"].lower()) & (df["Time"] == i["Time"].strip()) & (df["Directions"] == i["Direction"].strip()))

        df_new.show()
        df_new = df_new.toPandas()
        print len(df_new)
        if(len(df_new)==0):
            continue
        df_new['Time'] = pandas.to_datetime(df_new['Time']).dt.time
        temp = df_new[["Num of Vehicle", "Time"]]
        temp = df_new[["Num of Vehicle", "Time"]]
        d = temp["Num of Vehicle"]
        d = list(d)
        index = list(temp["Time"])
        [float(i) for i in d]
        temp = pandas.Series(data=d, index=index, dtype=float)
        size = int(len(temp) * 0.90)
        train, test = temp[0:size], temp[size:len(temp)]
        mean = test.mean()
        print "Mean is: ", test.mean()
        print test[1:5]
        print type(test)
        otest=[]
        history = [x for x in train]
        predictions = list()
        for t in range(len(test)):
            model = ARIMA(history, order=(5, 1, 0))
            model_fit = model.fit(disp=0)
            output = model_fit.forecast()
            yhat = output[0]
            predictions.append(yhat)
            obs = test[t:t + 1]
            history.append(obs)
            print('predicted=%f, expected=%f' % (yhat, obs))
            ##print"------>",type(yhat)
            print yhat[0]
            ##print "----->",type(obs)
            otest.append(int(yhat))
        error = mean_squared_error(test, predictions)
        print('Test MSE:', error)
        val=sum(otest) / float(len(otest))
        print "Mean of predicted is:",val
        print type(respObj)
        print val
        respObj["CongestionRate"]=str(val)+"%"
        respObj["StreetName"]=jsonIndex
        jsonResponse.append(respObj.copy())
        print jsonResponse

    print "Final Output is::::",jsonResponse
    print "Writing into congestionresult.json file"
    with open('Congestionresult.json', 'w') as fp:
        json.dump(jsonResponse, fp, sort_keys=True, indent=4)


if __name__ == "__main__":
    print "calling function:"
    json=Prediction(jsonBody)

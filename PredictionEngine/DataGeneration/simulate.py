from datetime import *
import calendar
import json
import random
import configparser

def GenerateStreetList():
    config = configparser.ConfigParser()
    config.read('config.ini')
    print "Sections are: ", config.sections()
    RoadList = {}
    FinalRoadList = []
    for each_section in config.sections():
        for (each_key, each_val) in config.items(each_section):
            RoadList['Category'] = each_section
            if each_key in 'speed':
                RoadList['Speed'] = each_val.encode('utf-8')
            if each_key in 'capacity':
                RoadList['Capacity'] = each_val.encode('utf-8')
            if each_key not in 'speed' and each_key not in 'capacity':
                RoadList['Street Name'] = each_key.encode('utf-8')
                x = each_val.encode('utf-8')
                Directions = x.split(',')
                for i in range(len(Directions)):
                    Directions[i] = Directions[i].strip()
                #print Directions
                RoadList['Directions'] = Directions[0]
                #print RoadList
                FinalRoadList.append(RoadList.copy())
                if (len(Directions) > 1):
                    RoadList['Directions'] = Directions[1]
                    FinalRoadList.append(RoadList.copy())
                    print RoadList
    print "Final Number of Streets!",len(FinalRoadList)
    with open('StreetList.json', 'w') as fp:
        json.dump(FinalRoadList, fp, sort_keys=True, indent=4)
    fp.close()
    return len(FinalRoadList)



weightsForStreets = {"Monday": 1.5, "Tuesday": 1.2, "Wednesday": 1.5, "Thursday": 1, "Friday": 0.9, "Saturday": 0.7,
                     "Sunday": 0.5}
weightsForHighways = {"Monday": 1.3, "Tuesday": 1, "Wednesday": 1.2, "Thursday":1.4, "Friday": 0.75, "Saturday": 1.7,
                      "Sunday": 1.8}


def simulateMajorArterial(theDay, x,theDate):
    FinalTrafficlist=[]

    if x['Directions'] in 'North' or x['Directions'] in 'West':
        for hour in range(0, 24):
            if hour >= 0 and hour < 6:
                num_of_vehicle = random.randint(0, 20)
            elif hour > 6 and hour < 11:
                num_of_vehicle = random.randint(65, 100)
            elif hour > 11 and hour < 13:
                num_of_vehicle = random.randint(25, 55)

            elif hour > 13 and hour < 16:
                num_of_vehicle = random.randint(35, 65)

            elif hour > 16 and hour < 20:
                num_of_vehicle = random.randint(45, 90)
            else:
                num_of_vehicle = random.randint(20, 50)
            if num_of_vehicle > 65:
                congestion = True
            else:
                congestion = False
            x['Day'] = theDay
            timeStamp = datetime.strptime(str(hour), "%H").time()
            #print timeStamp
            x['Date']=str(theDate)
            x['Time'] = str(timeStamp)
            x['Num of Vehicle'] = round(weightsForStreets[theDay]*num_of_vehicle)
            x['Congestion'] = congestion
            x['Capacity'] = x['Capacity']
            x['Week Number']=theDate.isocalendar()[1]
            #print x
            FinalTrafficlist.append(x.copy())
        return FinalTrafficlist
    else:
        #print "Found south or East! ", x['Street Name']
        for hour in range(0, 24):
            if hour >= 0 and hour < 7:
                num_of_vehicle = random.randint(0, 10)
            elif hour > 7 and hour < 10:
                num_of_vehicle = random.randint(45, 75)
            elif hour > 10 and hour < 16:
                num_of_vehicle = random.randint(55, 85)
            elif hour > 16 and hour < 18:
                num_of_vehicle = random.randint(85, 100)
            else:
                num_of_vehicle = random.randint(20, 35)
            if num_of_vehicle > 65:
                congestion = True  # True
            else:
                congestion = False  # False
            x['Day'] = theDay
            x['Date'] = theDate
            x['Week Number'] = theDate.isocalendar()[1]
            timeStamp = datetime.strptime(str(hour), "%H").time()
            #print timeStamp
            x['Time'] = str(timeStamp)
            x['Num of Vehicle'] = round(weightsForStreets[theDay]*num_of_vehicle)
            x['Congestion'] = congestion
            #print x
            FinalTrafficlist.append(x.copy())
        return FinalTrafficlist



def simulateCollector(theDay, x,theDate):
    FinalTrafficlist=[]
    for hour in range(0, 24):
            if hour >= 0 and hour < 6:
                num_of_vehicle = random.randint(0, 20)
            elif hour > 6 and hour < 11:
                num_of_vehicle = random.randint(55, 90)
            elif hour > 11 and hour < 13:
                num_of_vehicle = random.randint(35, 65)
            elif hour > 13 and hour < 16:
                num_of_vehicle = random.randint(45, 75)
            elif hour > 16 and hour < 20:
                num_of_vehicle = random.randint(55, 80)
            else:
                num_of_vehicle = random.randint(20, 40)
            if num_of_vehicle > 65:
                congestion = True
            else:
                congestion = False
            x['Day'] = theDay
            x['Date'] = theDate
            timeStamp = datetime.strptime(str(hour), "%H").time()
            #print timeStamp
            x['Time'] = str(timeStamp)
            x['Week Number'] = theDate.isocalendar()[1]
            x['Num of Vehicle'] = round(weightsForStreets[theDay]*num_of_vehicle)
            x['Congestion'] = congestion
            x['Capacity'] = x['Capacity']
            #print x
            FinalTrafficlist.append(x.copy())
    return FinalTrafficlist

def simulateMinorArt(theDay, x, localWeight,theDate):
    FinalTrafficlist = []
    for hour in range(0, 24):
        if hour >= 0 and hour < 6:
            num_of_vehicle = random.randint(10,35)
        elif hour > 6 and hour < 11:
            num_of_vehicle = random.randint(25,78)
        elif hour > 11 and hour < 13:
            num_of_vehicle = random.randint(45,60)
        elif hour > 13 and hour < 16:
            num_of_vehicle = random.randint(55,70)
        elif hour > 16 and hour < 20:
            num_of_vehicle = random.randint(45,85)
        else:
            num_of_vehicle = random.randint(35,50)
        if num_of_vehicle > 65:
            congestion = True
        else:
            congestion = False
        x['Day'] = theDay
        x['Date'] = theDate
        timeStamp = datetime.strptime(str(hour), "%H").time()
        #print timeStamp
        x['Time'] = str(timeStamp)
        x['Week Number'] = theDate.isocalendar()[1]
        x['Num of Vehicle'] = round(weightsForStreets[theDay] * num_of_vehicle*localWeight)
        x['Congestion'] = congestion
        x['Capacity'] = x['Capacity']
        #print x
        FinalTrafficlist.append(x.copy())
    return FinalTrafficlist

def simulateInterStateTraffic(theDay, x, weight,theDate):
    FinalTrafficlist=[]
    if x['Directions'] in 'North' or x['Directions'] in 'West':
        for hour in range(0, 24):
            if hour >= 0 and hour < 6:
                num_of_vehicle = random.randint(25, 45)
            elif hour > 6 and hour < 11:
                num_of_vehicle = random.randint(75, 145)
            elif hour > 11 and hour < 13:
                num_of_vehicle = random.randint(75, 90)
            elif hour > 13 and hour < 16:
                num_of_vehicle = random.randint(30, 55)
            elif hour > 16 and hour < 20:
                num_of_vehicle = random.randint(65, 90)
            else:
                num_of_vehicle = random.randint(35, 40)
            if num_of_vehicle > 65:
                congestion = True
            else:
                congestion = False
            x['Day'] = theDay
            x['Date'] = theDate
            timeStamp = datetime.strptime(str(hour), "%H").time()
            x['Time'] = str(timeStamp)
            x['Week Number'] = theDate.isocalendar()[1]
            x['Num of Vehicle'] = round(weightsForStreets[theDay]*num_of_vehicle*weight)
            x['Congestion'] = congestion
            x['Capacity'] = x['Capacity']
            FinalTrafficlist.append(x.copy())
        return FinalTrafficlist
    else:
        for hour in range(0, 24):
            if hour >= 0 and hour < 7 and theDay:

                num_of_vehicle = random.randint(25, 45)
            elif hour > 7 and hour < 11:
                num_of_vehicle = random.randint(30, 75)
            elif hour > 11 and hour < 16:
                num_of_vehicle = random.randint(25, 65)
            elif hour > 16 and hour < 18:
                num_of_vehicle = random.randint(95, 150)
            else:
                num_of_vehicle = random.randint(20, 35)
            if num_of_vehicle > 65:
                congestion = True  # True
            else:
                congestion = False  # False
            x['Day'] = theDay
            x['Date'] = theDate
            timeStamp = datetime.strptime(str(hour), "%H").time()
            #print timeStamp
            x['Time'] = str(timeStamp)
            x['Week Number'] = theDate.isocalendar()[1]
            x['Num of Vehicle'] = round(weightsForStreets[theDay]*num_of_vehicle*weight)
            x['Congestion'] = congestion
            #print x
            FinalTrafficlist.append(x.copy())
        return FinalTrafficlist




def simulateExpresswayTraffic(theDay,x,theDate):
    FinalTrafficlist = []
    for hour in range(0, 24):
            if hour >= 0 and hour < 6:
                num_of_vehicle = random.randint(25, 45)
            elif hour > 6 and hour < 11:
                num_of_vehicle = random.randint(75, 145)
            elif hour > 11 and hour < 13:
                num_of_vehicle = random.randint(35, 40)
            elif hour > 13 and hour < 16:
                num_of_vehicle = random.randint(25, 35)
            elif hour > 16 and hour < 20:
                num_of_vehicle = random.randint(85, 130)
            else:
                num_of_vehicle = random.randint(25, 40)
            if num_of_vehicle > 65:
                congestion = True
            else:
                congestion = False
            x['Day'] = theDay
            x['Week Number'] = theDate.isocalendar()[1]

            timeStamp = datetime.strptime(str(hour), "%H").time()
            #print timeStamp
            x['Time'] = str(timeStamp)
            x['Date'] = theDate
            x['Num of Vehicle'] = round(weightsForStreets[theDay] * num_of_vehicle)
            x['Congestion'] = congestion
            x['Capacity'] = x['Capacity']
            #print x
            FinalTrafficlist.append(x.copy())
    return FinalTrafficlist


def GenerateTrafficDS():
    congestion = None
    d1 = date(2017, 01, 01)  # start date
    d2 = date(2018, 01, 01)  # end date
    trafficDataSet = []
    delta = d2 - d1
    print delta.days
    with open("SimulatedData.json", 'a') as f:
        f.write('[')
        f.close()
    with open('StreetList.json', 'r') as fp:
        data = json.load(fp)
        for oneDay in range(delta.days):
            for x in data:
                theDate = d1 + timedelta(days=oneDay)
                theDay = calendar.day_name[theDate.weekday()]
                if x['Category'] in 'Major Arterial':
                    #print "Generating Major Arterial Data"
                    AllDayMATraffic = []
                    AllDayMATraffic = simulateMajorArterial(theDay, x,theDate)
                    #print AllDayMATraffic
                    #print len(AllDayMATraffic)
                    trafficDataSet = trafficDataSet + AllDayMATraffic
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()

                    #print len(trafficDataSet)

                elif x['Category'] in 'Collector':
                    #print "Collector"
                    AllDayCollectorTraffic = []
                    AllDayCollectorTraffic = simulateCollector(theDay, x,theDate)
                    #print len(trafficDataSet)
                    #print AllDayCollectorTraffic
                    #print len(AllDayCollectorTraffic)
                    trafficDataSet = trafficDataSet + AllDayCollectorTraffic
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()

                elif x['Category'] in 'Minor Arterial':
                    #print "Minor Arterial"
                    AllDayMinorArterialTraffic = []
                    AllDayMinorArterialTraffic = simulateMinorArt(theDay, x, 1, theDate)
                    #print AllDayMinorArterialTraffic
                    trafficDataSet = trafficDataSet + AllDayMinorArterialTraffic
                elif x['Category'] in 'Local':
                    #print "Local"
                    AllDayLocalTraffic = []
                    AllDayLocalTraffic = simulateMinorArt(theDay, x, 0.75,theDate)
                    #print AllDayLocalTraffic
                    trafficDataSet = trafficDataSet + AllDayLocalTraffic
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()

                elif x['Category'] in 'Interstate':
                    #print "Interstate"
                    AllDayInterstateTraffic = []
                    AllDayInterstateTraffic = simulateInterStateTraffic(theDay, x, 1,theDate)
                    #print AllDayInterstateTraffic
                    trafficDataSet = trafficDataSet + AllDayInterstateTraffic
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()
                elif x['Category'] in 'California Highway':
                    #print "California Highway"
                    AllDayHighwayTraffic = []
                    AllDayHighwayTraffic = simulateInterStateTraffic(theDay, x, 0.9,theDate)
                    trafficDataSet = trafficDataSet + AllDayHighwayTraffic
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()
                    #print AllDayHighwayTraffic
                elif x['Category'] in 'Expressway':
                    Expressway = []
                    Expressway = simulateExpresswayTraffic(theDay, x,theDate)
                    trafficDataSet = trafficDataSet + Expressway
                    #print Expressway
                    #print "Expressway"
                    with open("SimulatedData.json",'a') as f:
                        for i in AllDayMATraffic:
                            f.write(str(i))
                            f.write(',')
                        f.close()
        with open('trafficDataSet.json', 'w') as fp:
            json.dump(trafficDataSet, fp, sort_keys=True, indent=4)
        print len(trafficDataSet)
    return len(trafficDataSet)


def Test(numberOfStreets,lengthofDs):
    d1 = date(2017, 01, 01)  # start date
    d2 = date(2018, 01, 01)  # end date
    delta = d2 - d1
    print delta.days
    print "Final Number of Streets!",numberOfStreets
    print "Length of DS",lengthofDs
    if(numberOfStreets*delta.days*24 == lengthofDs):
        return "Test Passed"
    else:
        return "Test Failed"


if __name__:
    numberofStreets=GenerateStreetList()
    lengthofDS=GenerateTrafficDS()
    print Test(numberofStreets,lengthofDS)




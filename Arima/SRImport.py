## This file imports the data for all steets for 1 month.
import pandas
import json
import datetime
import time
from matplotlib import pyplot
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
from pandas.plotting import autocorrelation_plot
import matplotlib
pyplot.ion()

with open('allStreet_oneMonth.json') as data_file:
    data = json.load(data_file)
print data[3]
df = pandas.read_json('allStreet_oneMonth.json')

# df['Date']=df['Date'].astype(str)
# df['Time']=df['Time'].astype(str)

#df['Time_new']=df['Date'].map(str) + df['Time']
# df ['Time_New']=df[['Date','Time']].apply(lambda x: ' '.join(x),axis=1)
# print df['Time_New']
# df['Time_New']=pandas.to_datetime(df['Time_New'],format="%Y-%m-%d ")
# print df['Time_New']
# print type(df['Time_New'][0])
df['Date'] = pandas.to_datetime(df['Date'],format="%Y-%m-%d").dt.date
df['Time'] = pandas.to_numeric(df['Time'])-1
df['Time'] = pandas.to_datetime(df['Time'],format="%H").dt.time
print "Date column type is:",type(df['Date'][0])  ## Should be datetime.date
datetimelist=[]

for i in range(len(df)):
    x=datetime.datetime.combine(df['Date'][i],df['Time'][i])
    datetimelist.append(x)

newTime=pandas.Series(data=datetimelist)
df['Time_New'] = newTime
date = "2015-01-01"
time = "9"

date = datetime.datetime.strptime(date,'%Y-%m-%d')
time = datetime.datetime.strptime(time,'%H')
date = datetime.datetime.date(date) ## should be datetime.date

print "Getting previous day date"
startDate = date - datetime.timedelta(days=1)
time = datetime.datetime.time(time)

print "Start Time:",time
print "Start date",startDate

print "Get dataset for previous day"
#df_new = df[(df.Date >=startDate) & (df.Date <= date) &(df.Street =='Bird Av')]

df_new = df[(df.Time == time)&(df.Street =='Bird Av')]
print "total rows",len(df_new)

temp=df_new[['Num Of Vehicle', 'Time_New']]
d = temp['Num Of Vehicle']
d=list(d)
index=temp['Time_New']
index=list(index)
[float(i) for i in d]
temp = pandas.Series(data=d, index=index, dtype=float)
#temp.astype('float64')

print temp[0]
print "yoU NEED TO SEE FLOAT HERE",type(temp[0])

# print temp.head()
# pandas.plotting.autocorrelation_plot(temp)
#
# model = ARIMA(temp, order=(5,1,0))
# model_fit = model.fit(disp=0)
# print(model_fit.summary())
#
# residuals = pandas.DataFrame(model_fit.resid)
# residuals.plot()
# pyplot.show()
# residuals.plot(kind='kde')
# pyplot.show()
# print(residuals.describe())


#####------------------------------#####

size = int(len(temp) * 0.66)
train, test = temp[0:size], temp[size:len(temp)]
history = [x for x in train]
predictions = list()
for t in range(len(test)):
	model = ARIMA(history, order=(5,1,0))
	model_fit = model.fit(disp=0)
	output = model_fit.forecast()
	yhat = output[0]
	predictions.append(yhat)
	obs = test[t]
	history.append(obs)
	print('predicted=%f, expected=%f' % (yhat, obs))
error = mean_squared_error(test, predictions)
print('Test MSE:',error)
# plot
pyplot.plot(test)
pyplot.plot(predictions,color='red')
pyplot.savefig('/User/Anushavijay/Desktop/test.png')

for i in range(10000):
    continue


















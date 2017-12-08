import os
import commands
def importToMFS():
    sourcepath = raw_input("Enter the Source Path of the dataset: ")
    destinationPath = raw_input("Enter the Destination Path of the dataset: ")
    if(os.path.exists(sourcepath)==True):
        print commands.getoutput("hadoop fs -put -f "+sourcepath.strip()+" "+destinationPath.strip())
        print commands.getoutput('hadoop fs -ls '+destinationPath.strip())
    else:
        print "Check Input Source Path"


def importToMongo():
    sourcepath = raw_input("Enter the Source Path of the dataset: ")
    if (os.path.exists(sourcepath) == True):
        print commands.getoutput('mongoimport --db dataStore --collection trafficDataSet --drop --jsonArray --file '+sourcepath.strip())
    else:
        print "Check Input Source Path"

if __name__:
    name = raw_input("Do you want to import the dataset into MapR-FS? Type yes or no: ")
    if(name.lower()=='yes'):
        importToMFS()
    else:
        name = raw_input("Do you want to import the dataset into MongoDB? Type yes or no: ")
        if(name.lower()=='no'):
            importToMongo()
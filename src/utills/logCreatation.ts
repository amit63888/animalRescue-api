import Log from '../model/Users/log'
export const createUserLog=async(userId:any,activity:any,message:any)=> {
    const newLog = new Log({userId,activity,message});
    const registeredLog=  await newLog.save();
    return registeredLog;
  }
 
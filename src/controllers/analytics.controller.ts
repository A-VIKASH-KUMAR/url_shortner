import Analytics from '../models/analytics.model';
import { redis } from '../db';
import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-lite'
export const trackVisit = async (urlId:string, req:any) => {
    try {
      const userId = req.user?._id;
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];
      const device = UAParser(userAgent);
      const location = geoip.lookup(ipAddress);
      const count = 0
      const analytics = await Analytics.findOneAndUpdate({"urlId":urlId},{
        urlId,
        userId,
        ipAddress,
        userAgent,
        device,
        location,
        count:count+1
      }, {upsert:true});
  
      // Update cache
      const date = new Date().toISOString();
    //   const countClick = await redis.hincrby(`analytics:${urlId}:daily:${date}`, 'clicks', 1);
    //   if (!countClick){
    //     return null
    //   }
    //   return countClick
    return analytics
    } catch (error) {
      console.error("Error occoured in track visit function",error);
      return error
    }
  };

export const getAnalytics = async (req:any, res:any) => {
  try {
    const urlId = req.params.alias;
    const dateRange = req.query.dateRange || 7;

    const analytics = await Analytics.find({ urlId })
      .sort({ timestamp: -1 })
      .limit(dateRange);

    return res.json(analytics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
};
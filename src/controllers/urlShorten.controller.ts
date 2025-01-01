import { Url } from '../models/urlShortner.model';
import { ObjectId } from 'mongoose';
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export const createShortUrl = async (req: any, res: any) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const userId = req.user._id;

    // Validate URL
    if (!isValidUrl(longUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Handle custom alias
    let alias = customAlias;
    if (!alias) {
      const { nanoid } = await import('nanoid');
      alias = nanoid(8);
    } else {
      // Check if custom alias is available
      const existingUrl = await Url.findOne({ alias });
      if (existingUrl) {
        return res.status(400).json({ error: 'Custom alias already taken' });
      }
    }

    // Create URL record
    const url = new Url({ userId, alias, longUrl, topic, customAlias: !!customAlias });
    await url.save();

    // const redis = new Redis
    // // Cache the URL mapping
    // await redis.set(`url:${alias}`, longUrl, 'EX', 86400); // 24 hours

    return res.status(201).json({ shortUrl: `${process.env.BASE_URL}/api/${alias}`, createdAt: url.createdAt });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ error: 'Error creating short URL' });
  }
};

export const getUserUrls = async (req:any, res:any) => {
  try {
    const userId = req.user._id
    const userShortenUrlsData = await Url.find({userId:userId})
    return res.status(200).json({"urls":userShortenUrlsData})
  } catch (error) {
    console.error("Error occoured to fetch user shorten urls", error);
    return res.status(500).json({ error: 'Error fetching user shortened urls list' });
  }
}

export const getLongUrl = async (req:any, res:any) => {
  try {
    const alias = req.params.alias
    const aliasData = await Url.findOne({"alias":alias})
    const longUrl = aliasData?.longUrl
    return res.redirect(longUrl)
  } catch (error) {
    console.error("Error occoured to fetch long url from alias",error);
    return error
  }
}
import 'dotenv/config';

export const config = {
  alysseApiUrl: process.env.ALYSSE_API_URL ?? 'https://alysse.top/api/bypass',
  useBypassApiUrl: process.env.USEBYPASS_API_URL ?? 'https://usebypas.com/api/v1/bypass',
  useBypassToken: process.env.USEBYPASS_API_TOKEN,
  omegaTechApiUrl: process.env.OMEGATECH_API_URL ?? 'https://api.omegatech.app/api/tools/all-bypass',
};

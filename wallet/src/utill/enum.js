import {StacksMainnet, StacksMocknet, StacksTestnet} from "@stacks/network";

export const Page = {
  LOGIN: 'login',
  HOME: 'home',
  TRANSFER: 'transfer',
  SETTING: 'setting',
}
export const LAMPORTS_PER_STX = 1000000

export const NetworkType = {
  MainNetwork: new StacksMainnet(),
  TestNetwork: new StacksTestnet(),
  // url 설정 필요 기본 'http://localhost:3999'
  customNetwork: new StacksMocknet({url: `http://localhost:3999`})
}

import numeral from 'numeral'
import { utils } from 'ethers'
import { type } from 'os';

const formatWalletAddress = (address: string) =>
    `${address?.substring(0, 5)}...${address?.substring(address.length, address.length - 5)}`;

// @ts-ignore
const formatUnit = (value) => {
    if (!value) return
    return parseFloat(utils.formatEther(value))
}

// @ts-ignore
const parseUnit = (value) => utils.parseEther(value.toString(), 'ether')

// @ts-ignore
type ConvertFunction = (item:string) => void
const convertToNumber:ConvertFunction = (item: string) => numeral(item).value()

// @ts-ignore

const formatDate = (value) => {
    // @ts-ignore
    const _format = formatUnit(value) * 10 ** 18
    const date = new Date(_format)
    return date.toUTCString()
}

// @ts-ignore

const formatDuration = (value) => {
    // @ts-ignore
    const _format = formatUnit(value) * 10 ** 18
    const date = new Date(_format)
    return date.getMinutes()
}

const covertToReadableDate = (value: number) => {
    const _date = new Date(value * 1000).toDateString()
    return _date
}

export {
    formatUnit,
    parseUnit,
    convertToNumber,
    formatDate,
    formatDuration,
    formatWalletAddress,
    covertToReadableDate
}
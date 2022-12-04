import one from '@/public/asset/faces/1.png'
import two from '@/public/asset/faces/2.png'
import three from '@/public/asset/faces/3.png'
import four from '@/public/asset/faces/4.png'
import five from '@/public/asset/faces/5.png'

const recentTransactionHeading = ['client', 'amount', 'date', 'status']

const recentTransactions = [
    {
        name: 'Angela Bower',
        avatar: one,
        amount: '$1,000',
        date: '22 Jun, 2022, 19:25PM',
        status: 'complete'
    },
    {
        name: 'Michael Knight',
        avatar: two,
        amount: '$1,000',
        date: '22 Jun, 2022, 19:25PM',
        status: 'pending'
    },
    {
        name: 'Lynn Tanner',
        avatar: three,
        amount: '$1,000',
        date: '22 Jun, 2022, 19:25PM',
        status: 'complete'
    },
    {
        name: 'Angus MacGyver',
        avatar: four,
        amount: '$1,000',
        date: '22 Jun, 2022, 19:25PM',
        status: 'pending'
    },
    {
        name: 'Theo Calvin',
        avatar: five,
        amount: '$1,000',
        date: '22 Jun, 2022, 19:25PM',
        status: 'pending'
    },
]

export {
    recentTransactionHeading,
    recentTransactions
}
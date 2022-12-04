## Gigza - A Decentralized Freelancing Marketplace

![Gigza Homepage](https://i.imgur.com/FSJWGWS.png "Gigza Homepage")

### Live Demo - [https://gigza-app.vercel.app](https://gigza-app.vercel.app)

### Tech Stack of Gigza
* Solidity
* Next.js
* Tailwind CSS
* React
* Hardhat
* Polygon (Mumbai Testnet)

### The Use of Gigza
Gigza is a permissionless freelancing marketplace that connects clients (anyone with a project or problem) to skilled freelancers (problem solvers).

### Brief Description of Gigza
Gigza is a permissionless decentralized freelancing marketplace that allows anyone to post a job and get help from freelancers with the requisite skills. Freelancers can also earn a living regardless of where they may be situated and their access to bank services by bidding and executing client jobs. The smart contract acts as the escrow account replacing the need for an intermediary.

### Inspiration
I was inspired to build Gigza, a decentralized freelancing marketplace because I firmly believe that for Web3 to gain true adoption it needs to power real-world business use cases. As a freelancer on traditional Web2 platforms, I understand the pain points such as the high service fee paid to the marketplace, in many cases a whopping 20% of revenue, the gated approach to approving freelancers before they can participate, the hassle of transferring funds earned to a local currency and bank account, the threat of countrywide bans, etc. and I also know that Web3 technologies can address most of those challenges. I, therefore, decided to take on this challenge by building a Web3 native freelancing platform/marketplace.

### How I Built It
Gigza was built using smart contracts on Polygon, React for the frontend through Next.js, and access is via a non-custodial wallet like Metamask.

### Challenges I Ran Into
The main challenge was the viability of creating a messaging platform to aid communication between clients and freelancers. The other challenge was the problem of arbitration on the platform which is currently based on the intervention of a human operator.

### What I Learned
I learned that the efficiency of Polygon because of the low gas fees and Proof of Stake (PoS) consensus allows for an application like this to be built. It allowed the design of the platform to leverage cheap on-chain interactions.

### Value Proposition of Gigza
* Permissionless access to the platform for both clients and freelancers.
* Reduced commission fee for freelancers (2%) compared to 20% of Web2 competitors.
* Easy access to monies earned through a relatively decentralized stablecoin - DAI.
* Clients in jurisdictions with Foreign Exchange (FX) fiat limits on their bank cards can fund larger scale projects through cryptocurrency and Gigza.

### Testing the Demo dApp
* Go to the demo URL - [https://gigza-app.vercel.app](https://gigza-app.vercel.app)
* Login with your non-custodial wallet e.g Metamask via the `Connect wallet` button at the top right corner.
* You must connect a wallet to see the data.
* Click on `Find Work`.
* Bid for a job as a freelancer.
* To create a job post as a client, you must have the dummy DAI token, to pay for the job.
* Go to the dummy DAI token contract on Polygonscan (Mumbai) - [0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F](https://mumbai.polygonscan.com/address/0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F#writeContract).
* Use the `Connect to Web3` button to connect your wallet and click on `Write` on the mint function, this will send 1000 Dummy DAI tokens to your wallet.
* Click on `Post a Job` on the Gigza homepage or `Post Job` button on the top menu and fill in the details.
* You can create or update your profile on the profile page. Click on the dropdown icon by your Polygon address at the top right-hand corner, then click on `View Profile` and `Edit Profile`.

### Deployed Contracts (Mumbai Testnet)
Gigza - [0xBE4230c239D96bE66B1e1E4d387adc9B73cb77A3](https://mumbai.polygonscan.com/address/0xBE4230c239D96bE66B1e1E4d387adc9B73cb77A3)

Dummy DAI Token - [0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F](https://mumbai.polygonscan.com/address/0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F)

### What's Next for Gigza
The Gigza dApp can be optimized to give a truly exceptional user experience. I will like to source team members and funding to continue building Gigza as I believe a Web3 freelancing platform can be transformational and capture good market share in this era of remote work.

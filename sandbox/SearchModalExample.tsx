import dynamic from 'next/dynamic';
import React from 'react'
const SearchModalDynamic = dynamic(() => import('@/app/shared/components/search-modal/SearchModal'), { ssr: false });

const SearchModalExample = () => (
    <div>
        <SearchModalDynamic searchEntity='naics' data={{
            NAICS: ['111140', '112120', '113210', '211120', '221310', '111140', '112120', '113210', '211120', '221310'],
            'Industry Title': ['Wheat Farming', 'Dairy Cattle and Milk Production', 'Forestry and Logging', 'Crude Petroleum Extraction', 'Water Supply and Irrigation Systems', 'Corn Farming', 'Sheep Farming', 'Timber Harvesting', 'Natural Gas Extraction', 'Irrigation Management'],
            Keywords: ['Agriculture', 'Dairy Products', 'Wood Harvesting', 'Petroleum', 'Water Supply', 'Crops', 'Livestock', 'Forest Management', 'Energy', 'Water Resources'],
            'Revenue': ['100M', '200M', '150M', '500M', '75M', '120M', '250M', '175M', '600M', '85M'],
            'Employees': ['50', '120', '80', '200', '30', '60', '150', '90', '250', '40'],
            'Market Share': ['15%', '10%', '20%', '30%', '5%', '12%', '18%', '22%', '35%', '8%'],
            'Growth Rate': ['2%', '5%', '3%', '8%', '1%', '4%', '6%', '2.5%', '9%', '1.5%'],
            'Export Value': ['50M', '75M', '60M', '120M', '40M', '55M', '85M', '65M', '130M', '45M'],
            'Operating Costs': ['70M', '150M', '100M', '350M', '50M', '90M', '175M', '110M', '400M', '60M'],
            'Headquarters Location': ['Kansas', 'Wisconsin', 'Alaska', 'Texas', 'California', 'Nebraska', 'Oregon', 'Montana', 'Oklahoma', 'Nevada'],
            'CEO': ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 'Anna White', 'Chris Evans', 'Laura Thompson', 'Brian Harris', 'Alice Green'],
            'Founded': ['1990', '1985', '2000', '1975', '2010', '1995', '1980', '2005', '1960', '2015'],
            'Annual Profit': ['30M', '50M', '40M', '150M', '25M', '45M', '70M', '60M', '180M', '35M'],
            'R&D Expenditure': ['5M', '8M', '7M', '20M', '3M', '6M', '10M', '9M', '25M', '4M'],
            'Market Capitalization': ['1B', '2B', '1.5B', '5B', '750M', '1.2B', '2.5B', '1.7B', '5.5B', '800M'],
            'Net Income': ['20M', '35M', '25M', '100M', '15M', '30M', '45M', '40M', '120M', '20M'],
            'Taxes Paid': ['10M', '20M', '15M', '60M', '8M', '12M', '22M', '18M', '65M', '10M'],
            'Debt': ['50M', '100M', '70M', '200M', '40M', '55M', '110M', '80M', '220M', '45M'],
            'Assets': ['500M', '1B', '800M', '2.5B', '400M', '600M', '1.2B', '900M', '3B', '450M'],
            'Liabilities': ['200M', '500M', '350M', '1B', '150M', '250M', '550M', '400M', '1.2B', '200M'],
            'Equity': ['300M', '500M', '450M', '1.5B', '250M', '350M', '650M', '500M', '1.8B', '300M'],
            'Dividend Yield': ['2%', '3%', '2.5%', '4%', '1.8%', '2.2%', '3.5%', '2.8%', '4.2%', '1.9%'],
            'Stock Price': ['$50', '$100', '$75', '$150', '$60', '$55', '$110', '$80', '$160', '$65'],
            'Price-to-Earnings Ratio': ['15', '20', '18', '25', '12', '16', '22', '19', '27', '14'],
            'Earnings Per Share': ['$5', '$10', '$8', '$15', '$6', '$6.5', '$11', '$9', '$16', '$7'],
            'Industry Growth': ['3%', '4%', '2%', '6%', '1%', '3.5%', '5%', '2.2%', '7%', '1.2%'],
            'Competitors': ['Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F', 'Company G', 'Company H', 'Company I', 'Company J'],
            'Customer Satisfaction': ['85%', '90%', '80%', '95%', '75%', '88%', '93%', '82%', '96%', '78%'],
            'Production Volume': ['100K tons', '200K liters', '150K cubic meters', '500K barrels', '75K cubic meters', '120K tons', '220K liters', '160K cubic meters', '550K barrels', '85K cubic meters'],
            'Supply Chain Partners': ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F', 'Partner G', 'Partner H', 'Partner I', 'Partner J']
        }}
            cb={(selectedItems: number[]) => console.log(selectedItems)}
            selectedItems={[2, 3, 4, 6, 9]} />
    </div>
)

export default SearchModalExample
import {roles,job_categories,id_types,offer_status} from './Enums';

export let exampleUser = {
        id: 2137,
        creation_date: '01.01.2001',
        role: roles.user,
        hash: 'SOM3V3RYS3CUR3H4SH',
        internal: true,
        email: 'someone@example.com',
        first_name: 'Krzysztof',
        last_name: 'Kononowicz',
        job_type: job_categories.government,
        income_level: 32000,
        id_type: id_types.PESEL,
        id_number: '45728493717'
};

export let exampleInquiries = [
        {
                id: 1001,
                creation_date: '2012-04-23T18:25:43.511Z',
                user_id: 2137,
                ammount: 20000,
                installments: 24
        },
        {
                id: 1002,
                creation_date: '2012-05-20T18:25:43.511Z',
                user_id: 2137,
                ammount: 30000,
                installments: 18
        },
        {
                id: 1003,
                creation_date: '2012-04-21T18:25:43.511Z',
                user_id: 2137,
                ammount: 25000,
                installments: 40
        },
        {
                id: 1004,
                creation_date: '2012-07-23T18:25:43.511Z',
                user_id: 2137,
                ammount: 30000,
                installments: 18
        },
        {
                id: 1005,
                creation_date: '2012-01-11T18:25:43.511Z',
                user_id: 2137,
                ammount: 30000,
                installments: 18
        },
];

export let exampleOffers = [
        {
                id: 2003,
                creation_date: '2023-01-02T18:25:43.511Z',
                user_id: 2137,
                bank_id: 1001,
                platform_id: 1001,
                ammount: 20000,
                installments: 36,
                status:  offer_status.accepted,
                generated_contract_url: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signed_contract_url: "https://en.wikipedia.org/wiki/Suinae"
        },
        {
                id: 2004,
                creation_date: '2023-01-04T18:25:43.511Z',
                user_id: 2137,
                bank_id: 2001,
                platform_id: 2001,
                ammount: 30000,
                installments: 18,
                status:  offer_status.offered,
                generated_contract_url: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signed_contract_url: ""
        },
        {
                id: 2005,
                creation_date: '2022-11-21T18:25:43.511Z',
                user_id: 2137,
                bank_id: 3001,
                platform_id: 3001,
                ammount: 17000,
                installments: 12,
                status:  offer_status.waiting_for_acceptance,
                generated_contract_url: "https://en.wikipedia.org/wiki/Sus_(genus)",
                signed_contract_url: "https://en.wikipedia.org/wiki/Suinae"
        }
]
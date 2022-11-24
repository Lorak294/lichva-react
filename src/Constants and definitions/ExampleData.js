import {roles,job_categories,id_types} from './Enums';

export let exampleUser = {
        id: 2137,
        creation_date: '01.01.2001',
        role: roles.user,
        hash: 'SOMEV3RYS3CUR3H4SH',
        internal: true,
        email: 'someone@example.com',
        first_name: 'Krzysztof',
        last_name: 'Kononowicz',
        job_type: job_categories.government,
        income_level: 32000,
        id_type: id_types.PESEL,
        id_number: '45728493717'
};


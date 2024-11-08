// src/data/zones.ts

export interface TimeZoneOption
{
    fullName: string;
    label: string;
    jsName: string;
    iana: string;
}

export const zones: TimeZoneOption[] = [
    {
        fullName: 'ACDT - Australian Central Daylight (UTC+10:30)',
        label: 'ACDT (UTC+10:30)',
        jsName: 'Australian Central Daylight Time',
        iana: 'Australia/Adelaide',
    },
    {
        fullName: 'ACST - Australian Central Standard (UTC+9.5)',
        label: 'ACST (UTC+9.5)',
        jsName: 'Australian Central Standard Time',
        iana: 'Australia/Adelaide',
    },
    {
        fullName: 'ACWST - Australian Central Western Standard (UTC+8.75)',
        label: 'ACWST (UTC+8.75)',
        jsName: 'Australian Central Western Standard Time',
        iana: 'Australia/Eucla',
    },
    {
        fullName: 'ADT - Atlantic Daylight (UTC-3)',
        label: 'ADT (UTC-3)',
        jsName: 'Atlantic Daylight Time',
        iana: 'America/Halifax',
    },
    {
        fullName: 'AEDT - Australian Eastern Daylight (UTC+11)',
        label: 'AEDT (UTC+11)',
        jsName: 'Australian Eastern Daylight Time',
        iana: 'Australia/Sydney',
    },
    {
        fullName: 'AEST - Australian Eastern Standard (UTC+10)',
        label: 'AEST (UTC+10)',
        jsName: 'Australian Eastern Standard Time',
        iana: 'Australia/Brisbane',
    },
    {
        fullName: 'AFT - Afghanistan (UTC+4:30)',
        label: 'AFT (UTC+4:30)',
        jsName: 'Afghanistan Time',
        iana: 'Asia/Kabul',
    },
    {
        fullName: 'AKDT - Alaska Daylight (UTC-8)',
        label: 'AKDT (UTC-8)',
        jsName: 'Alaska Daylight Time',
        iana: 'America/Juneau',
    },
    {
        fullName: 'AKST - Alaska Standard (UTC-9)',
        label: 'AKST (UTC-9)',
        jsName: 'Alaska Standard Time',
        iana: 'America/Anchorage',
    },
    {
        fullName: 'AMST - Amazon Summer (UTC-3)',
        label: 'AMST (UTC-3)',
        jsName: 'Amazon Summer Time',
        iana: 'America/Manaus',
    },
    {
        fullName: 'AMT - Amazon (UTC-4)',
        label: 'AMT (UTC-4)',
        jsName: 'Amazon Time',
        iana: 'America/Manaus',
    },
    {
        fullName: 'AMT - Armenia (UTC+4)',
        label: 'AMT (UTC+4)',
        jsName: 'Armenia Time',
        iana: 'Asia/Yerevan',
    },
    {
        fullName: 'ART - Argentina (UTC-3)',
        label: 'ART (UTC-3)',
        jsName: 'Argentina Time',
        iana: 'America/Buenos_Aires',
    },
    {
        fullName: 'AST - Atlantic Standard (UTC-4)',
        label: 'AST (UTC-4)',
        jsName: 'Atlantic Standard Time',
        iana: 'America/Halifax',
    },
    {
        fullName: 'AST - Arabian Standard (UTC+3)',
        label: 'AST (UTC+3)',
        jsName: 'Arabian Standard Time',
        iana: 'Asia/Riyadh',
    },
    {
        fullName: 'AWDT - Australian Western Daylight (UTC+9)',
        label: 'AWDT (UTC+9)',
        jsName: 'Australian Western Daylight Time',
        iana: '',
    },
    {
        fullName: 'AWST - Australian Western Standard (UTC+8)',
        label: 'AWST (UTC+8)',
        jsName: 'Australian Western Standard Time',
        iana: 'Australia/Perth',
    },
    {
        fullName: 'AZOST - Azores Standard (UTC-1)',
        label: 'AZOST (UTC-1)',
        jsName: 'Azores Standard Time',
        iana: 'Atlantic/Azores',
    },
    {
        fullName: 'AZT - Azerbaijan (UTC+4)',
        label: 'AZT (UTC+4)',
        jsName: 'Azerbaijan Time',
        iana: 'Asia/Baku',
    },
    {
        fullName: 'BRT - Brasília (UTC-3)',
        label: 'BRT (UTC-3)',
        jsName: 'Brasília Time',
        iana: 'America/Sao_Paulo',
    },
    {
        fullName: 'BST - British Summer (UTC+1)',
        label: 'BST (UTC+1)',
        jsName: 'British Summer Time',
        iana: 'Europe/London',
    },
    {
        fullName: 'BST - Bangladesh Standard (UTC+6)',
        label: 'BST (UTC+6)',
        jsName: 'Bangladesh Standard Time',
        iana: 'Asia/Dhaka',
    },
    {
        fullName: 'BTT - Bhutan (UTC+6)',
        label: 'BTT (UTC+6)',
        jsName: 'Bhutan Time',
        iana: 'Asia/Thimphu',
    },
    {
        fullName: 'CAT - Central Africa (UTC+2)',
        label: 'CAT (UTC+2)',
        jsName: 'Central Africa Time',
        iana: 'Africa/Johannesburg',
    },
    {
        fullName: 'CDT - Central Daylight (UTC-5)',
        label: 'CDT (UTC-5)',
        jsName: 'Central Daylight Time',
        iana: 'America/Chicago,',
    },
    {
        fullName: 'CEST - Central European Summer (UTC+2)',
        label: 'CEST (UTC+2)',
        jsName: 'Central European Summer Time',
        iana: 'Europe/Berlin',
    },
    {
        fullName: 'CET - Central European (UTC+1)',
        label: 'CET (UTC+1)',
        jsName: 'Central European Time',
        iana: 'Europe/Berlin',
    },
    {
        fullName: 'CHADT - Chatham Island Daylight (UTC+13:45)',
        label: 'CHADT (UTC+13:45)',
        jsName: 'Chatham Island Daylight Time',
        iana: 'Pacific/Chatham',
    },
    {
        fullName: 'CHAST - Chatham Island Standard (UTC+12:45)',
        label: 'CHAST (UTC+12:45)',
        jsName: 'Chatham Island Standard Time',
        iana: 'Pacific/Chatham',
    },
    {
        fullName: 'CKT - Cook Island (UTC-10)',
        label: 'CKT (UTC-10)',
        jsName: 'Cook Island Time',
        iana: 'Pacific/Rarotonga',
    },
    {
        fullName: 'CLST - Chile Summer (UTC-3)',
        label: 'CLST (UTC-3)',
        jsName: 'Chile Summer Time',
        iana: 'America/Santiago',
    },
    {
        fullName: 'CLT - Chile Standard (UTC-4)',
        label: 'CLT  (UTC-4)',
        jsName: 'Chile Standard Time',
        iana: 'America/Santiago',
    },
    {
        fullName: 'CST - Central Standard (UTC-6)',
        label: 'CST (UTC-6)',
        jsName: 'Central Standard Time',
        iana: 'America/Chicago',
    },
    {
        fullName: 'CST - China Standard (UTC+8)',
        label: 'CST (UTC+8)',
        jsName: 'China Standard Time',
        iana: 'Asia/Shanghai',
    },
    {
        fullName: 'EAT - East Africa (UTC+3)',
        label: 'EAT (UTC+3)',
        jsName: 'East Africa Time',
        iana: 'Africa/Nairobi',
    },
    {
        fullName: 'EDT - Eastern Daylight (UTC-4)',
        label: 'EDT (UTC-4)',
        jsName: 'Eastern Daylight Time',
        iana: 'America/New_York',
    },
    {
        fullName: 'EEST - Eastern European Summer (UTC+3)',
        label: 'EEST (UTC+3)',
        jsName: 'Eastern European Summer Time',
        iana: 'Europe/Sofia',
    },
    {
        fullName: 'EET - Eastern European (UTC+2)',
        label: 'EET (UTC+2)',
        jsName: 'Eastern European Time',
        iana: 'Europe/Athens',
    },
    {
        fullName: 'EST - Eastern Standard (UTC-5)',
        label: 'EST (UTC-5)',
        jsName: 'Eastern Standard Time',
        iana: 'America/New_York',
    },
    {
        fullName: 'FET - Further Eastern European (UTC+3)',
        label: 'FET (UTC+3)',
        jsName: 'Further Eastern European Time',
        iana: 'Europe/Kaliningrad',
    },
    {
        fullName: 'FJST - Fiji Summer (UTC+13)',
        label: 'FJST (UTC+13)',
        jsName: 'Fiji Summer Time',
        iana: 'Pacific/Fiji',
    },
    {
        fullName: 'FJT - Fiji (UTC+12)',
        label: 'FJT (UTC+12)',
        jsName: 'Fiji Time',
        iana: 'Pacific/Fiji',
    },
    {
        fullName: 'FNT - Fernando de Noronha (UTC-2)',
        label: 'FNT (UTC-2)',
        jsName: 'Fernando de Noronha Time',
        iana: 'America/Noronha',
    },
    {
        fullName: 'GALT - Galapagos (UTC-6)',
        label: 'GALT (UTC-6)',
        jsName: 'Galapagos Time',
        iana: 'Pacific/Galapagos',
    },
    {
        fullName: 'GFT - French Guiana (UTC-3)',
        label: 'GFT (UTC-3)',
        jsName: 'French Guiana Time',
        iana: 'America/Cayenne',
    },
    {
        fullName: 'GMT - Greenwich Mean (UTC+0)',
        label: 'GMT (UTC+0)',
        jsName: 'Greenwich Mean Time',
        iana: 'Etc/GMT',
    },
    {
        fullName: 'GST - South Georgia (UTC-2)',
        label: 'GST (UTC-2)',
        jsName: 'South Georgia Time',
        iana: 'Atlantic/South_Georgia',
    },
    {
        fullName: 'GST - Gulf Standard (UTC+4)',
        label: 'GST (UTC+4)',
        jsName: 'Gulf Standard Time',
        iana: 'Asia/Dubai',
    },
    {
        fullName: 'HADT - Hawaii-Aleutian Daylight (UTC-9)',
        label: 'HADT (UTC-9)',
        jsName: 'Hawaii-Aleutian Daylight Time',
        iana: 'America/Adak',
    },
    {
        fullName: 'HAST - Hawaii-Aleutian Standard (UTC-10)',
        label: 'HAST (UTC-10)',
        jsName: 'Hawaii-Aleutian Standard Time',
        iana: 'America/Adak',
    },
    {
        fullName: 'HKT - Hong Kong (UTC+8)',
        label: 'HKT (UTC+8)',
        jsName: 'Hong Kong Time',
        iana: 'Asia/Hong_Kong',
    },
    {
        fullName: 'HMT - Heard and McDonald Islands (UTC+5)',
        label: 'HMT (UTC+5)',
        jsName: 'Heard and McDonald Islands Time',
        iana: 'Indian/Kerguelen',
    },
    {
        fullName: 'HST - Hawaii Standard (UTC-10)',
        label: 'HST (UTC-10)',
        jsName: 'Hawaii Standard Time',
        iana: 'Pacific/Honolulu',
    },
    {
        fullName: 'ICT - Indochina (UTC+7)',
        label: 'ICT (UTC+7)',
        jsName: 'Indochina Time',
        iana: 'Asia/Bangkok',
    },
    {
        fullName: 'IDT - Israel Daylight (UTC+3)',
        label: 'IDT (UTC+3)',
        jsName: 'Israel Daylight Time',
        iana: 'Asia/Jerusalem',
    },
    {
        fullName: 'IRDT - Iran Daylight (UTC+4:30)',
        label: 'IRDT (UTC+4:30)',
        jsName: 'Iran Daylight Time',
        iana: 'Asia/Tehran',
    },
    {
        fullName: 'IRST - Iran Standard (UTC+3:30)',
        label: 'IRST (UTC+3:30)',
        jsName: 'Iran Standard Time',
        iana: 'Asia/Tehran',
    },
    {
        fullName: 'IST - Irish Standard (UTC+1)',
        label: 'IST (UTC+1)',
        jsName: 'Irish Standard Time',
        iana: 'Europe/Dublin',
    },
    {
        fullName: 'IST - Israel Standard (UTC+2)',
        label: 'IST (UTC+2)',
        jsName: 'Israel Standard Time',
        iana: 'Asia/Jerusalem',
    },
    {
        fullName: 'IST - Indian Standard (UTC+5:30)',
        label: 'IST (UTC+5:30)',
        jsName: 'Indian Standard Time',
        iana: 'Asia/Kolkata',
    },
    {
        fullName: 'JST - Japan Standard (UTC+9)',
        label: 'JST (UTC+9)',
        jsName: 'Japan Standard Time / Japan Daylight Time',
        iana: 'Asia/Tokyo',
    },
    {
        fullName: 'KST - Korea Standard (UTC+9)',
        label: 'KST (UTC+9)',
        jsName: 'Korea Standard Time / Korea Daylight Time',
        iana: 'Asia/Seoul',
    },
    {
        fullName: 'MDT - Mountain Daylight (UTC-6)',
        label: 'MDT (UTC-6)',
        jsName: 'Mountain Daylight Time',
        iana: 'America/Denver',
    },
    {
        fullName: 'MHT - Marshall Islands (UTC+12)',
        label: 'MHT (UTC+12)',
        jsName: 'Marshall Islands Time',
        iana: 'Pacific/Majuro',
    },
    {
        fullName: 'MSK - Moscow Standard (UTC+3)',
        label: 'MSK (UTC+3)',
        jsName: 'Moscow Standard Time',
        iana: 'Europe/Moscow',
    },
    {
        fullName: 'MST - Mountain Standard (UTC-7)',
        label: 'MST (UTC-7)',
        jsName: 'Mountain Standard Time',
        iana: 'America/Denver',
    },
    {
        fullName: 'MYT - Malaysia (UTC+8)',
        label: 'MYT (UTC+8)',
        jsName: 'Malaysia Time',
        iana: 'Asia/Kuala_Lumpur',
    },
    {
        fullName: 'NCT - New Caledonia (UTC+11)',
        label: 'NCT (UTC+11)',
        jsName: 'New Caledonia Time',
        iana: 'Pacific/Noumea',
    },
    {
        fullName: 'NDT - Newfoundland Daylight (UTC-2:30)',
        label: 'NDT (UTC-2:30)',
        jsName: 'Newfoundland Daylight Time',
        iana: 'America/St_Johns',
    },
    {
        fullName: 'NFT - Norfolk Island (UTC+11:30)',
        label: 'NFT (UTC+11:30)',
        jsName: 'Norfolk Island Time',
        iana: 'Pacific/Norfolk',
    },
    {
        fullName: 'NPT - Nepal (UTC+5:45)',
        label: 'NPT (UTC+5:45)',
        jsName: 'Nepal Time',
        iana: 'Asia/Kathmandu',
    },
    {
        fullName: 'NST - Newfoundland Standard (UTC-3:30)',
        label: 'NST (UTC-3:30)',
        jsName: 'Newfoundland Standard Time',
        iana: 'America/St_Johns',
    },
    {
        fullName: 'NUT - Niue (UTC-11)',
        label: 'NUT (UTC-11)',
        jsName: 'Niue Time',
        iana: 'Pacific/Niue',
    },
    {
        fullName: 'NZDT - New Zealand Daylight (UTC+13)',
        label: 'NZDT (UTC+13)',
        jsName: 'New Zealand Daylight Time',
        iana: 'Pacific/Auckland',
    },
    {
        fullName: 'NZST - New Zealand Standard (UTC+12)',
        label: 'NZST (UTC+12)',
        jsName: 'New Zealand Standard Time',
        iana: 'Pacific/Auckland',
    },
    {
        fullName: 'PDT - Pacific Daylight (UTC-7)',
        label: 'PDT (UTC-7)',
        jsName: 'Pacific Daylight Time',
        iana: 'America/Los_Angeles',
    },
    {
        fullName: 'PET - Peru (UTC-5)',
        label: 'PET (UTC-5)',
        jsName: 'Peru Time',
        iana: 'America/Lima',
    },
    {
        fullName: 'PGT - Papua New Guinea (UTC+10)',
        label: 'PGT (UTC+10)',
        jsName: 'Papua New Guinea Time',
        iana: 'Pacific/Port_Moresby',
    },
    {
        fullName: 'PST - Pacific Standard (UTC-8)',
        label: 'PST (UTC-8)',
        jsName: 'Pacific Standard Time',
        iana: 'America/Los_Angeles',
    },
    {
        fullName: 'PYST - Paraguay Summer (UTC-3)',
        label: 'PYST (UTC-3)',
        jsName: 'Paraguay Summer Time',
        iana: 'America/Asuncion',
    },
    {
        fullName: 'PYT - Paraguay Standard (UTC-4)',
        label: 'PYT (UTC-4)',
        jsName: 'Paraguay Standard Time',
        iana: 'America/Asuncion',
    },
    {
        fullName: 'RET - Reunion (UTC+4)',
        label: 'RET (UTC+4)',
        jsName: 'Reunion Time',
        iana: 'Indian/Reunion',
    },
    {
        fullName: 'ROTT - Rothera Research (UTC-3)',
        label: 'ROTT (UTC-3)',
        jsName: 'Rothera Research Time',
        iana: 'Antarctica/Rothera',
    },
    {
        fullName: 'SAKT - Sakhalin (UTC+11)',
        label: 'SAKT (UTC+11)',
        jsName: 'Sakhalin Time',
        iana: 'Asia/Sakhalin',
    },
    {
        fullName: 'SAMT - Samara (UTC+4)',
        label: 'SAMT (UTC+4)',
        jsName: 'Samara Time',
        iana: 'Europe/Samara',
    },
    {
        fullName: 'SAST - South Africa Standard (UTC+2)',
        label: 'SAST (UTC+2)',
        jsName: 'South Africa Standard Time',
        iana: 'Africa/Johannesburg',
    },
    {
        fullName: 'SBT - Solomon Islands (UTC+11)',
        label: 'SBT (UTC+11)',
        jsName: 'Solomon Islands Time',
        iana: 'Pacific/Honiara',
    },
    {
        fullName: 'SCT - Seychelles (UTC+4)',
        label: 'SCT (UTC+4)',
        jsName: 'Seychelles Time',
        iana: 'Indian/Mahe',
    },
    {
        fullName: 'SGT - Singapore (UTC+8)',
        label: 'SGT (UTC+8)',
        jsName: 'Singapore Time',
        iana: 'Asia/Singapore',
    },
    {
        fullName: 'SLST - Sri Lanka Standard (UTC+5:30)',
        label: 'SLST (UTC+5:30)',
        jsName: 'Sri Lanka Standard Time',
        iana: 'Asia/Colombo',
    },
    {
        fullName: 'SRET - Srednekolymsk (UTC+11)',
        label: 'SRET (UTC+11)',
        jsName: 'Srednekolymsk Time',
        iana: 'Asia/Srednekolymsk',
    },
    {
        fullName: 'SRT - Suriname (UTC-3)',
        label: 'SRT (UTC-3)',
        jsName: 'Suriname Time',
        iana: 'America/Paramaribo',
    },
    {
        fullName: 'SST - Samoa Standard (UTC-11)',
        label: 'SST (UTC-11)',
        jsName: 'Samoa Standard Time',
        iana: 'Pacific/Apia',
    },
    {
        fullName: 'SYOT - Syowa (UTC+3)',
        label: 'SYOT (UTC+3)',
        jsName: 'Syowa Time',
        iana: 'Antarctica/Syowa',
    },
    {
        fullName: 'TAHT - Tahiti (UTC-10)',
        label: 'TAHT (UTC-10)',
        jsName: 'Tahiti Time',
        iana: 'Pacific/Tahiti',
    },
    {
        fullName: 'THA - Thailand (UTC+7)',
        label: 'THA (UTC+7)',
        jsName: 'Thailand Standard Time',
        iana: 'Asia/Bangkok',
    },
    {
        fullName: 'TFT - French Southern and Antarctic (UTC+5)',
        label: 'TFT (UTC+5)',
        jsName: 'French Southern and Antarctic Time',
        iana: 'Indian/Kerguelen',
    },
    {
        fullName: 'TJT - Tajikistan (UTC+5)',
        label: 'TJT (UTC+5)',
        jsName: 'Tajikistan Time',
        iana: 'Asia/Dushanbe',
    },
    {
        fullName: 'TKT - Tokelau (UTC+13)',
        label: 'TKT (UTC+13)',
        jsName: 'Tokelau Time',
        iana: 'Pacific/Fakaofo',
    },
    {
        fullName: 'TLT - Timor-Leste (UTC+9)',
        label: 'TLT (UTC+9)',
        jsName: 'Timor-Leste Time',
        iana: 'Asia/Dili',
    },
    {
        fullName: 'TOT - Tonga (UTC+13)',
        label: 'TOT (UTC+13)',
        jsName: 'Tonga Time',
        iana: 'Pacific/Tongatapu',
    },
    {
        fullName: 'TRT - Turkey (UTC+3)',
        label: 'TRT (UTC+3)',
        jsName: 'Turkey Time',
        iana: 'Europe/Istanbul',
    },
    {
        fullName: 'TVT - Tuvalu (UTC+12)',
        label: 'TVT (UTC+12)',
        jsName: 'Tuvalu Time',
        iana: 'Pacific/Funafuti',
    },
    {
        fullName: 'ULAT - Ulaanbaatar (UTC+8)',
        label: 'ULAT (UTC+8)',
        jsName: 'Ulaanbaatar Time',
        iana: 'Asia/Ulaanbaatar',
    },
    {
        fullName: 'UTC - Coordinated Universal (UTC+0)',
        label: 'UTC (UTC+0)',
        jsName: 'Coordinated Universal Time',
        iana: 'Etc/UTC',
    },

    {
        fullName: 'UYST - Uruguay Summer (UTC-2)',
        label: 'UYST (UTC-2)',
        jsName: 'Uruguay Summer Time',
        iana: 'America/Montevideo',
    },

    {
        fullName: 'UYT - Uruguay Standard (UTC-3)',
        label: 'UYT (UTC-3)',
        jsName: 'Uruguay Standard Time',
        iana: 'America/Montevideo',
    },
    {
        fullName: 'VET',
        label: 'VET (UTC-4)',
        jsName: 'Venezuela Time',
        iana: 'America/Caracas',
    },

    {
        fullName: 'VLAT - Vladivostok (UTC+10)',
        label: 'VLAT (UTC+10)',
        jsName: 'Vladivostok Time',
        iana: 'Asia/Vladivostok',
    },
    {
        fullName: 'VOST - Vostok (UTC+6)',
        label: 'VOST (UTC+6)',
        jsName: 'Vostok Time',
        iana: 'Antarctica/Vostok',
    },
    {
        fullName: 'VUT - Vanuatu (UTC+11)',
        label: 'VUT (UTC+11)',
        jsName: 'Vanuatu Time',
        iana: 'Pacific/Efate',
    },
    {
        fullName: 'WAKT - Wake (UTC+12)',
        label: 'WAKT (UTC+12)',
        jsName: 'Wake Time',
        iana: 'Pacific/Wake',
    },
    {
        fullName: 'WAST - West Africa Summer (UTC+2)',
        label: 'WAST (UTC+2)',
        jsName: 'West Africa Summer Time',
        iana: 'Africa/Windhoe',
    },
    {
        fullName: 'WAT - West Africa (UTC+1)',
        label: 'WAT (UTC+1)',
        jsName: 'West Africa Time',
        iana: 'Africa/Lagos',
    },
    {
        fullName: 'WEST - Western European Summer (UTC+1)',
        label: 'WEST (UTC+1)',
        jsName: 'Western European Summer Time',
        iana: 'Europe/Lisbon',
    },
    {
        fullName: 'WET - Western European (UTC+0)',
        label: 'WET (UTC+0)',
        jsName: 'Western European Time',
        iana: 'Europe/Lisbon',
    },
    {
        fullName: 'WST - Western Standard (UTC+8)',
        label: 'WST (UTC+8)',
        jsName: 'Western Standard Time',
        iana: 'Australia/Perth',
    },
    {
        fullName: 'YAKT - Yakutsk (UTC+9)',
        label: 'YAKT (UTC+9)',
        jsName: 'Yakutsk Time',
        iana: 'Asia/Yakutsk',
    },
    {
        fullName: 'YEKT - Yekaterinburg (UTC+5)',
        label: 'YEKT (UTC+5)',
        jsName: 'Yekaterinburg Time',
        iana: 'Asia/Yekaterinburg',
    },
]
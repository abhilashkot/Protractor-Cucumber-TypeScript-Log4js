// Copyright Koninklijke Philips N.V. 2020
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import data from '../data/StudyDetails.json';
import { Log4jsconfig } from '../supportConfigs/Log4jsconfig';

export class ReadJsonData {
    /**
     * Fetch the index of the element from json
     * @param _item Key value for which index has to be found
     */
    public async GetIndexOfElementInJson(_item: string) {
        for (let count = 0; count <= 2; count++) {
            if (data.studyList[count].patientName === _item) {
                return count;
            }
        }

        return 0;
    }

    /**
     * Get the series details from json - In this json file study details is mentioned which is used for verification
     * @param _studyCount Study index value
     * @param _column series column location
     * @param _row series row location
     */
    public async GetSeriesDataFromJsonFile(_studyCount: number, _column: number, _row: number) {
        Log4jsconfig.Log().info(
            'Data from json file = ' + data.studyList[_studyCount].series[_column][_row]
        );

        return data.studyList[_studyCount].series[_column][_row];
    }

    /**
     * Get the series details from json - In this json file study details is mentioned which is used for verification
     * @param _studyCount Study index value
     * @param _column series column location
     * @param _row series row location
     */
    public GetPatientDataFromJsonFile(_studyCount: number, _key: string) {
        Log4jsconfig.Log().info('$$ --GetPatientDataFromJsonFile-- ');

        switch (_key) {
            case 'ID': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info('Value from json file = ' + data.studyList[0].ID);

                return data.studyList[0].ID.toString();
            }
            case 'DOB': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info('Value from json file = ' + data.studyList[0].DOB);

                return data.studyList[0].DOB;
            }
            case 'Sex': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info('Value from json file = ' + data.studyList[0].Sex);

                return data.studyList[0].Sex;
            }
            case 'AccessionNumber': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info(
                    'Value from json file = ' + data.studyList[0].AccessionNumber
                );

                return data.studyList[0].AccessionNumber;
            }
            case 'StudyDescription': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info(
                    'Value from json file = ' + data.studyList[0].StudyDescription
                );

                return data.studyList[0].StudyDescription;
            }
            case 'Modality': {
                Log4jsconfig.Log().info('key - ' + _key);
                Log4jsconfig.Log().info('Value from json file = ' + data.studyList[0].Modality);

                return data.studyList[0].Modality;
            }

            default: {
                Log4jsconfig.Log().info('Entered key ' + _key + ' does not have any value');

                return null;
            }
        }
    }
}

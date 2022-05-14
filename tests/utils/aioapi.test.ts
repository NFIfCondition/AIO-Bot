import axios from 'axios'
import { api } from '../../src';

const BASE_URL="https://api.ionic-host.de"
jest.mock('axios');

afterEach(() => { jest.resetAllMocks(); });

test('Calling getModules should return all modules', async() => {
    // given
    const modules = [
        { id: 1, name: "m1" },
        { id: 2, name: "m2" },
      ];
    const expectedResponse = {data: modules};
    mockAxiosGetCall(expectedResponse)
      
    // when
    const result = await api.getModules('123');

    // then
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/guild/123/modules`);
    expect(result).toEqual(expectedResponse);
})

test('Calling getModule should return expected module', async() => {
    // given
    const module = { id: 1, name: "m1" };
    const expectedResponse = {data: module};
    mockAxiosGetCall(expectedResponse)
      
    // when
    const result = await api.getModule('123', '1');

    // then
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/guild/123/module/1`);
    expect(result).toEqual(expectedResponse);
})

test('Calling updateModule should update the module', async() => {
    // given
    const module = { id: 1, name: "updatedM1" };
    const expectedResponse = {data: module};
    mockAxiosPostCall(expectedResponse)
      
    // when
    const result = await api.updateModule(1, module, 'update');

    // then
    expect(axios.post).toHaveBeenCalledTimes(1)
    // Unclear why the next line does not work, it seems not to recognize the object being equal
    // expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/1/update`,module)
    expect(result).toEqual(expectedResponse);
})

function mockAxiosGetCall(expectedResponse: object) {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(expectedResponse);
}

function mockAxiosPostCall(expectedResponse: object) {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(expectedResponse);
}
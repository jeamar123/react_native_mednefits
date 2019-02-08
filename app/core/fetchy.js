/*
 * @author detatsatrio
 * @year 2018
 */

import { PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getAlert, getNotify } from './notify';
import * as Config from '../config';
import * as Core from './index';
import SystemSetting from 'react-native-system-setting'

const headerLogin = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function fetching(params, callback) {
  Core.CheckNetworkConnection(connection => {
    try {
      if (connection == 'none') {
        throw 'No Internet Connection';
      } else if (connection == 'unknown') {
        throw 'Connection Unknown';
      } else {
        fetch(params.url, {
          method: params.method,
          headers: params.header,
          body:
            params.body == ''
              ? ''
              : (typeof params.body == 'object' && params.bodyType == 'object') || params.bodyType == 'multipart'
                ? params.body
                : JSON.stringify(params.body),
          mode: (params.mode) ? params.mode : false,
          cache: (params.cache) ? params.cache : false
        })
          .then(response => response.json())
          .then(res => {
            if (!res.status) {
              // getAlert('', res.message);

              if (res.expired) {
                Actions.Login({ type: 'reset' });
              }
              callback(res);
            } else if (res.status) {
              callback(res);
            } else {
              // getAlert('', 'Please try again...');
            }
          })
          .catch(error => {
            console.warn('error fetching' + error.message);
            Core.getNotify('', 'Ooops, failed to process data...');
          });
      }
    } catch (e) {
      Core.getNotify('', e);
    }
  });
}

export async function LoginProcess(username, password, callback) {
  try {
    loginParameter = {
      grant_type: 'password',
      client_secret: Config.CLIENT_SECRET,
      client_id: Config.CLIENT_ID,
      username: username,
      password: password,
    };

    params = {
      url: Config.AUTH_LOGIN,
      method: 'POST',
      header: headerLogin,
      body: loginParameter,
    };

    await fetching(params, async result => {
      if (!result.status) {
        getNotify('', result.error_description);
        await callback(true);
      } else {
        getNotify('', 'Success! Wait a second...');

        data = result.data;
        data_parse = typeof data == 'string' ? JSON.parse(data) : data;
        access_token = data_parse.access_token;

        params = {
          key: 'access_token',
          value: access_token,
        };

        await Core.SetDataLocal(params, async (err, result) => {
          if (result) {
            await callback('', true);
            // Actions.Home({ type: 'reset' });
          } else {
            getNotify('', 'Failed login, try again');
          }
        });
      }
    });
  } catch (e) {
    Core.getNotify('', 'Failed login, try again');
  }
}

export async function UserDetail(callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        if (err || result == undefined) {
          Actions.Login({ type: 'reset' });
        } else {
          params = {
            url: Config.AUTH_USER_PROFILE,
            method: 'GET',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: result,
            },
          };
          await fetching(params, async result => {
            await callback('', result)
          });
        }
      });
    } catch (e) {
      console.warn('error user detail' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export async function GetBalance(callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_CREDITS,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get balance' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export async function GetHistoryTransaction(callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_NETWORK_TRANSACTION,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get history transaction' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 10);
}

export async function GetEClaimTransaction(callback) {
  await setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.USER_ECLAIM_TRANSACTION,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          console.warn('GetEClaimTransaction')
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error get Eclaim Transaction' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export function GetUserNetwork(tid, callback) {
  setTimeout(function () {
    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        params = {
          url: Config.USER_SPECIFIC_IN_NETWORK + '/' + tid,
          method: 'GET',
          header: {
            Authorization: result,
          },
        };

        fetching(params, result => {
          // console.warn(result);
          callback(result);
        });
      });
    } catch (e) {
      console.warn('error get GetUserNetwork' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export function GetSpesificEclaim(tid, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_SPECIFIC_E_CLAIM + '/' + tid,
        method: 'GET',
        header: { Authorization: result },
      };

      fetching(params, result => {
        callback(result);
      });
    });
  } catch (e) {
    console.warn('error get GetSpesificEclaim' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetECardDetail(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.AUTH_CARD_DETAILS,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get Ecard Detail' + e.message);
  }
}

export function GetBarcodeData(url, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: url,
        method: 'GET',
        header: {
          Authorization: result,
        },
      };

      fetching(params, result => {
        callback(result);
      });
    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export function SendPayment(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_SEND_PAYMENT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function GetFavouritesClinic(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_GET_FAVOURITE,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error get favourites clinic' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetClinicDetails(id, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_DETAILS + "/" + id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetClinicDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetProcedureDetails(id, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_PROCEDURE_DETAILS + "/" + id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export async function GetClinicType(callback) {
  setTimeout(async function () {
    try {
      await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
        params = {
          url: Config.CLINIC_CLINIC_TYPE,
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };
        await fetching(params, async result => {
          await callback('', result);
        });
      });
    } catch (e) {
      console.warn('error GetProcedureDetails' + e.message);
      getNotify('', 'Failed get data, try again');
    }
  }, 100);
}

export function GetHealthTypeList(type, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_HEALT_TYPE_LIST + "?spending_type=" + type,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function GetAllMember(callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.USER_MEMBERLIST,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetProcedureDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function SendEClaim(params, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      let myHeaders = new Headers();
      let formdata = new FormData();

      myHeaders.append('Authorization', result);
      formdata.append("user_id", params.user_id)
      formdata.append("service", params.service)
      formdata.append("merchant", params.merchant)
      formdata.append("files[]", {
        uri: params.file,
        type: params.filetype,
        name: params.filename
      }
      )
      formdata.append("amount", params.amount)
      formdata.append("date", params.date)
      formdata.append("spending_type", params.spending_type)
      formdata.append("time", params.time);

      params = {
        url: Config.USER_CREATE_E_CLAIM,
        method: 'POST',
        header: myHeaders,
        body: formdata,
        mode: 'cors',
        cache: 'default',
        bodyType: 'multipart'
      };

      fetching(params, result => {
        callback('', result);
      });

    });
  } catch (e) {
    getNotify('', 'Failed get data, try again');
  }
}

export function ResetPassword(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.AUTH_RESET_PASSWORD,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: {
        email: param
      },
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}


export function GetDetailClinic(id, callback) {
  try {
    Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
      params = {
        url: Config.CLINIC_CLINIC_DETAILS + "/" + id,
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      fetching(params, result => {
        callback('', result);
      });
    });
  } catch (e) {
    console.warn('error GetClinicDetails' + e.message);
    getNotify('', 'Failed get data, try again');
  }
}

export function Search(query) {
  return new Promise((resolve, reject) => {
    try {
      Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
        params = {
          url: Config.CLINIC_SEARCH + "/?search=" + query,
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            Authorization: result,
          },
        };

        fetching(params, result => {
          resolve(result)
        })
      });
    } catch (e) {
      reject(e)
    }
  })
}

export function PayDirect(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_PAYMENT_DIRECT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

export function AddFavouriteClinic(param, callback) {
  Core.GetDataLocal(Config.ACCESS_TOKEN, (err, result) => {
    params = {
      url: Config.CLINIC_SET_FAVOURITE,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: result,
      },
      body: param,
    };

    fetching(params, result => {
      callback('', result)
    })
  });
}

/** Get Location User */
// function GetCurrentLocation(callback) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       callback(position)
//     },
//     (error) => Common.getNotify("", error.message),
//     { enableHighAccuracy: false, timeout: 20000, maximumAge: 5000 },
//   );
// }

async function enableLocationDevice() {
  console.warn('switch location');
  await SystemSetting.isLocationEnabled().then(async (enable) => {
    if (!enable) {
      await SystemSetting.switchLocation(async () => {
        console.warn('switch location successfully');
        await GetLocation();
        return true;
      })
    } else {
      return true;
    }
  })
}

async function requestLocationPermission() {
  console.warn('request permission')
  const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
    console.warn('granted');
    await enableLocationDevice();
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission Device',
          'message': 'We need this permission to look for nearby location of clinic'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('granted');
        console.warn('You can use location');
        await enableLocationDevice();
        return true;
      } else {
        console.warn('location denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export async function GetLocation() {
  console.warn('get location');
  permissionLocation = await requestLocationPermission()
  console.warn('permissionLocation', permissionLocation);
  await navigator.geolocation.getCurrentPosition(
    async (position) => {
      // console.warn('position', position);
      latitude = await {
        key: Config.LATITUDE,
        value: JSON.stringify(position.coords.latitude)
      }

      longitude = await {
        key: Config.LONGITUDE,
        value: JSON.stringify(position.coords.longitude)
      }

      await Core.SetDataLocal(latitude, (err, result) => {
        if (result) {
          // console.warn("Set a new latitude");
        }
      })

      await Core.SetDataLocal(longitude, (err, result) => {
        // Common.getNotify("","")
        if (result) {
          // console.warn("Set a new longitude");
        }
      })

      return
    },
    function (error) {
      Core.getNotify("", error.message);
      // requestLocationPermission()
    },
    { enableHighAccuracy: true, timeout: 100000, maximumAge: 5000 },
  );
}

// export async function GetClinicMapList(callback) {
//   try {
//     result = await Core.GetDataLocal(Config.ACCESS_TOKEN)
//     latitude = await Core.GetDataLocalReturn(Config.LATITUDE)
//     longitude = await Core.GetDataLocalReturn(Config.LONGITUDE)

//     params = {
//       url: Config.CLINIC_PAGE_NEARBY + "/?lat=" + latitude + "/&lng=" + longitude + "/&type=1&page=1",
//       method: 'GET',
//       header: {
//         'Content-Type': 'application/json',
//         Authorization: result,
//       }
//     }

//     fetchData = await fetching(params, result => {
//       callback('', result);
//     });

//   } catch (e) {
//     Common.getNotify("", "Failed to get data")
//   }
// }

export async function GetClinicMapList(clinic_type_id, callback) {
  await enableLocationDevice();
  // try {
  latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
  longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)

  if (!latitude || !longitude) {
    getNotify('', 'Waiting to get device location');
    return false;
  } else {
    console.warn('latitude', latitude)
    console.warn('longitude', longitude)
    console.warn('list clinic_type_id', clinic_type_id)
    console.warn(Config.CLINIC_PAGE_NEARBY + "?lat=" + latitude + "&lng=" + longitude + "&type=" + clinic_type_id + "&page=1");
    await Core.GetDataLocal(Config.ACCESS_TOKEN, async (err, result) => {
      params = {
        url: Config.CLINIC_PAGE_NEARBY + "?lat=" + latitude + "&lng=" + longitude + "&type=" + clinic_type_id + "&page=1",
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: result,
        },
      };
      await fetching(params, async result => {
        console.warn(result);
        await callback('', result);
      });
    });
  }
  // } catch (e) {
  // 	console.warn(e);
  // 	getNotify('', 'Failed get data, try again');
  // }
}

import { useState, useEffect } from "react";


//  Use module is an API call for record value of the module

const useModuleRecord = (Entity, EntityId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before making the request

      try {
        const response = await ZOHO.CRM.API.getRecord({
          Entity: Entity,
          approved: "both",
          RecordID: EntityId
        });

        if (!response) {
          throw new Error('Network response was not ok');
        }

        if (response.status === 204) {
          if (isMounted) {
            setData(null); // No data available
          }
          return;
        }

        const result = response.data.shift(); // Adjust this if needed

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to mark component as unmounted
    };
  }, [Entity, EntityId]);

  return { data, error, loading };
};


//  Use useAssociateOrganizationInformation is an API standalone workflow to trigger assoicate organization in contact

const useAssociateOrganizationInformation = async (contactId,cin) => {  

  let func_name  = "get_organization_information";
  let req_data  ={
    "arguments": JSON.stringify({
        "crmAddresseeId" : contactId,
        "organizationCin" : cin
    })
  };
const response = await ZOHO.CRM.FUNCTIONS.execute(func_name,req_data);
console.log(response)

};



//  Use useAssociateOrganizationManagers is an API standalone workflow to trigger assoicate manager in contact
const useAssociateOrganizationManagers = async (clientId,contactId,cin) => {


  let func_name  = "unizo_associate_organization_managers";
  let req_data  ={
    "arguments": JSON.stringify({
        "companyInfoCin" : cin,
        "crmClientId" : clientId,
        "crmLegalPersonId":contactId,
    })
  };

  const response = await ZOHO.CRM.FUNCTIONS.execute(func_name,req_data);
  console.log(response)


};

//  Use useAssociateOrganizationShareholders is an API standalone workflow to trigger assoicate shareholder in contact
const useAssociateOrganizationShareholders = async (clientId,contactId,cin) => {

  let func_name  = "unizo_associate_organization_shareholders";
  let req_data  ={
    "arguments": JSON.stringify({
        "organizationCin" : cin,
        "crmClientId" : clientId,
        "crmLegalPersonId":contactId,
    })
  };

  const response = await ZOHO.CRM.FUNCTIONS.execute(func_name,req_data);
  console.log(response)


};


//  Use useAssociateOrganizationDocuments is an API standalone workflow to trigger assoicate documents in contact
const useAssociateOrganizationDocuments = async (contactId,register,registerNumber) => {

  let func_name  = "unizo_associate_organization_documents";
  let req_data  ={
    "arguments": JSON.stringify({
        "crmClientId" : contactId,
        "register" : register,
        "registerNumber":registerNumber,
    })
  };
  const response = await ZOHO.CRM.FUNCTIONS.execute(func_name,req_data);
  console.log(response)


};



//  Use useTriggerBlueprint is an API to proceed to next blueprint
const useTriggerBlueprint = async () => {
  await ZOHO.CRM.BLUEPRINT.proceed();
};


const useCancelButton = async () =>{
  await ZOHO.CRM.UI.Popup.closeReload();
}





export {useModuleRecord,useAssociateOrganizationInformation,useAssociateOrganizationManagers,useAssociateOrganizationShareholders,useAssociateOrganizationDocuments,useTriggerBlueprint,useCancelButton};
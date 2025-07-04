import { STRAPI_URL, getAuthHeaders } from "./config"

export async function login(identifier: string, password: string) {
  const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error("Invalid credentials")
  }

  return await response.json()
}

export async function fetchShipments({ page = 1, pageSize = 10, filters = {}, sort = "id:desc" } = {}) {
  const query = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    "populate": "customer,status_updates",
    "sort": sort, // Populate relations
    ...(filters && Object.keys(filters).length > 0 ? { filters: JSON.stringify(filters) } : {}),
  }).toString();

  const response = await fetch(`${STRAPI_URL}/api/shipments?${query}`, {
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if needed: "Authorization": "Bearer <token>"
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch shipments: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchShipment(trackingId: string) {
  const response = await fetch(
    `${STRAPI_URL}/api/shipments?filters[trackingId][$eq]=${trackingId}&populate[status_updates][populate]=location&populate=customer`,
    {
      headers: getAuthHeaders(),
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch shipment")
  }

  const data = await response.json()

  if (data.data && data.data.length > 0) {
    const shipment = data.data[0]
    // Sort status updates by createdAt in descending order
    shipment.statusUpdates?.data?.sort(
      (a: any, b: any) => new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime(),
    )
    return shipment
  } else {
    return null
  }
}

export async function createShipment(shipmentData: any) {
  try {
    // First, create or find the customer
    console.log('shipmentData',shipmentData);
    
    const customerResponse = await fetch(`${STRAPI_URL}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        data: {
          name: shipmentData.customer.name,
          address: shipmentData.customer.address,
          phone: shipmentData.customer.phone,
        },
      }),
    })

    if (!customerResponse.ok) {
      throw new Error("Failed to create/find customer")
    }

    const customerData = await customerResponse.json()

    // Now create the shipment with the customer reference
    const shipmentResponse = await fetch(`${STRAPI_URL}/api/shipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        data: {
          orderId: shipmentData.orderId,
          trackingId: shipmentData.trackingId,
          orderDate: shipmentData.orderDate,
          estimatedDelivery: shipmentData.estimatedDelivery,
          order_status: "yet_to_be_picked",
          originName: shipmentData.originName,
          originAddress: shipmentData.originAddress,
          customer: customerData.data.id, // Link to the customer
        },
      }),
    })

    if (!shipmentResponse.ok) {
      const errorData = await shipmentResponse.json().catch(() => null)
      console.error("Error response:", shipmentResponse.status, shipmentResponse.statusText, errorData)
      throw new Error(`Failed to create shipment: ${shipmentResponse.status} ${shipmentResponse.statusText}`)
    }

    return shipmentResponse.json()
  } catch (error) {
    console.error("Error in createShipment:", error)
    throw error
  }
}

// export async function fetchShipments() {
//   const response = await fetch(`${STRAPI_URL}/api/shipments?populate=*`, {
//     headers: getAuthHeaders(),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to fetch shipments")
//   }

//   return await response.json()
// }

export async function deleteStatusUpdate(statusUpdateId: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/status-updates/${statusUpdateId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to delete status update")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting status update:", error)
    throw error
  }
}

export async function deleteShipment(statusUpdateId: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/shipment/${statusUpdateId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to delete shipment")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting shipment:", error)
    throw error
  }
}


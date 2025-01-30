export const categoriesTableColumns = [
    {
      title: 'Désignation',
      dataIndex: 'categoryName',
      width: 100,
    },
    {
      title: 'Date de création',
      dataIndex: 'createdAt',
      width: 100,
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 100,
    }
]

export const typesTableColumns = [
    {
      title: 'Désignation',
      dataIndex: 'typeName',
      width: 80,
    },
    {
      title: 'Catégorie',
      dataIndex: 'categoryName',
      width: 80,
    },
    {
      title: 'Date de création',
      dataIndex: 'createdAt',
      width: 80,
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      width: 80,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 110,
    }
]

export const productsTableColumns = [
    {
      title: 'Image',
      dataIndex: 'productImage',
      width: 50,
    },
    {
      title: 'Désignation',
      dataIndex: 'productName',
      width: 80,
    },
    {
      title: 'Déscription',
      dataIndex: 'productDescription',
      width: 120,
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      width: 80,
    },
    {
      title: 'Catégorie',
      dataIndex: 'categoryName',
      width: 80,
    },
    {
      title: 'Statut',
      dataIndex: 'productStatus',
      width: 60,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 50,
    }
]

export const auctionsTableColumns = [
    {
      title: 'Produit',
      dataIndex: 'productName',
      width: 100,
    },
    {
      title: 'Prix de départ',
      dataIndex: 'auctionStartingPrice',
      width: 80,
    },
    {
      title: 'Prix actuel',
      dataIndex: 'auctionCurrentPrice',
      width: 60,
    },
    {
      title: 'Début',
      dataIndex: 'auctionStartDate',
      width: 60,
    },
    {
      title: 'Expiration',
      dataIndex: 'auctionEndDate',
      width: 60,
    },
    {
      title: 'Enchère',
      dataIndex: 'bidsCount',
      width: 50
    },
    {
      title: 'Statut',
      dataIndex: 'auctionStatus',
      width: 60
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 70,
    }
]

export const bidsTableColumns = [
    {
      title: 'Acheteur',
      dataIndex: 'buyer',
      width: 80,
    },
    {
      title: 'Produit',
      dataIndex: 'productName',
      width: 100,
    },
    {
      title: 'Prix',
      dataIndex: 'bidAmount',
      width: 60,
    },
    {
      title: 'Statut',
      dataIndex: 'bidStatus',
      width: 60,
    },
    {
      title: 'Date',
      dataIndex: 'bidDate',
      width: 60,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 70,
    }
]

export const usersTableColumns = [
    {
      title: 'Utilisateur',
      dataIndex: 'userName',
      width: 100,
    },
    {
      title: 'Adresse e-mail',
      dataIndex: 'userEmail',
      width: 100,
    },
    {
      title: 'Adresse du domicile',
      dataIndex: 'userAddress',
      width: 100,
    },
    {
      title: 'Numéro de téléphone',
      dataIndex: 'userPhoneNumber',
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: 50,
    }
]
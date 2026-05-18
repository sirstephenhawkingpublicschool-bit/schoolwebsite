import { NextResponse } from 'next/server';

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;

export async function POST(request: Request) {
  if (!HYGRAPH_ENDPOINT) {
    return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
  }

  try {
    const { searchBy, tcNumber, studentName, dob, admissionNo } = await request.json();

    let whereClause = {};

    if (searchBy === 'tc_number' && tcNumber) {
      whereClause = { tcNumber: tcNumber.trim() };
    } else if (searchBy === 'name_dob' && studentName && dob) {
      whereClause = {
        studentName_contains: studentName.trim(),
        dob: dob
      };
    } else if (searchBy === 'admission_number' && admissionNo) {
      whereClause = { admissionNo: admissionNo.trim() };
    } else {
      return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 });
    }

    const query = `
      query VerifyTC($where: TransferCertificateWhereInput!) {
        transferCertificates(where: $where) {
          id
          tcNumber
          studentName
          dob
          admissionNo
          fatherName
          motherName
          issueDate
          documentUrl
        }
      }
    `;

    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { where: whereClause }
      }),
    });

    const resJson = await response.json();

    if (resJson.errors) {
      return NextResponse.json({ error: resJson.errors[0].message }, { status: 400 });
    }

    const certificates = resJson.data?.transferCertificates || [];
    return NextResponse.json({ certificates });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

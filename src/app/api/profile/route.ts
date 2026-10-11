
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
      max: 2,
    })
  : null;

export async function PATCH(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "প্রথমে লগইন করুন।" },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("name" in body) ||
      typeof body.name !== "string"
    ) {
      return NextResponse.json(
        { error: "সঠিক নাম লিখুন।" },
        { status: 400 },
      );
    }

    const name = body.name.trim();

    if (!name || name.length > 80) {
      return NextResponse.json(
        { error: "নাম ১ থেকে ৮০ অক্ষরের মধ্যে লিখুন।" },
        { status: 400 },
      );
    }

    if (!pool) {
      return NextResponse.json(
        { error: "ডেটাবেস সংযোগ পাওয়া যায়নি।" },
        { status: 500 },
      );
    }

    const result = await pool.query(
      'UPDATE "user" SET name = $1 WHERE id = $2',
      [name, session.user.id],
    );

    if (result.rowCount !== 1) {
      return NextResponse.json(
        { error: "ব্যবহারকারীর তথ্য পাওয়া যায়নি।" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update failed:", error);

    return NextResponse.json(
      { error: "নাম সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।" },
      { status: 500 },
    );
  }
}

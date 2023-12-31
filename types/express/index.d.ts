declare namespace Express {
    interface Request {
        userProfile?: any,
        userId?: number,
        careerId?: number,
        favorite?: number,
        client?: any,
        knex?: any,
        results?: any,
        e?: any,
        mysql?: any,
        verifydata: any
        verifytoken: any
        knex: knex
        db: knex
        db1: knex
        db2: knex
        db3: knex
        db4: typeorm
        jwt: any
        authenticate: any
        connection: any
        ws: any
        io: any
        next: any
        exit: any
        req: any
        res: any
        id: number
        quantity: any
        expiry_date: any
        created_at: any
        updated_at: any
        server: any
        options: any
        days: any
        status: any
        code: any
        msg_time_en: any
        msg_time_th: any
        cache: any
        data: any
        msg_time: any
        expired_status: any
        TIMEEXPIRE: any
        time_expire_set1: any
        time_setting: any
        today: any
        date: any
        time: any
        dateTime: any
        issued_at: any
        timestamp: any
        expiration_time: any
        startdate: any
        time_expired: any
        day_expired: any
        timeconfig: any
        err: any
        TIMEEXPIRE: int
        timesetting: int
        timestamp_cul: int
        time_settings: int
        str: any
        read: any
        message: any
        dir: string
        sendcmd: any
        decoded:any
        user_id: number
        done: any 
        name: string
        description: string
        filename: string
        views: number
        isPublished: boolean
        getstate: any
        codegen: any
        clientsecret: any
        genint: any
        host: any
        port: any
        subscriber: any
        err:any
    }
}